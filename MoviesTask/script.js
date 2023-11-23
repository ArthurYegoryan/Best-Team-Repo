const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const results = document.getElementById("results");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-button");
const details = document.getElementById("details");
const plot = document.getElementById("plot");

const apiUrl = "http://www.omdbapi.com/";
const apiKey = "ff863910";

const fetchMovies = async (title) => {
  results.innerHTML = "";
  const response = await fetch(`${apiUrl}?s=${title}&apikey=${apiKey}`);
  const data = await response.json();
  if (data.Response === "True" && data.Search.length > 0) {
    for (const movie of data.Search) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", movie.imdbID);
      card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} poster image">
            <div class="info">
              <h3>${movie.Title}</h3>
              <p>${movie.Year}</p>
              <button class="btn">Details</button>
            </div>
          `;
      results.appendChild(card);

      card.addEventListener("click", () => {
        showMovieDetails(movie.imdbID);
      });
    }
  } else {
    results.innerHTML = `<p>No movies found for "${title}"</p>`;
  }
};

const showMovieDetails = async (id) => {
  details.innerHTML = "";
  plot.innerHTML = "";
  const response = await fetch(`${apiUrl}?i=${id}&apikey=${apiKey}`);
  const data = await response.json();
  if (data.Response === "True") {
    const poster = document.createElement("div");
    poster.innerHTML = `<img src="${data.Poster}" alt="${data.Title}">`;
    details.appendChild(poster);
    const info = document.createElement("div");
    info.classList.add("info");

    info.innerHTML = `
      <h1>${data.Title}</h1>
      <h2>${data.Year}</h2>
      <p>IMBD rating: ${data.imdbRating}</p>
      <p>Genre: ${data.Genre}</p>
      <p>Directed by: ${data.Director}</p>
      <p>Starring: ${data.Actors}</p>
      <span>${data.Awards}</span>
    `;

    details.appendChild(info);
    plot.innerHTML = `<p>${data.Plot}</p>`;
    modal.style.display = "flex";
    modal.classList.add("fadeIn");
  } else {
    details.innerHTML = `<p>Sorry, something went wrong.</p>`;
  }
};

searchButton.addEventListener("click", () => {
  const title = searchInput.value;
  if (title) {
    fetchMovies(title);
  } else {
    results.innerHTML = "<p>Please enter a movie title.</p>";
  }
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});
