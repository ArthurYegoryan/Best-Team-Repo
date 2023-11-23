async function getDogImage() {
  const select = document.getElementById("breeds");
  const breed = select.value;
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const data = await response.json();
  const gallery = document.getElementById("dogGallery");
  gallery.innerHTML = "";

  if (data.status === "success") {
    const img = document.createElement("img");
    img.src = data.message;
    gallery.appendChild(img);
  } else {
    gallery.innerHTML = "<p>Sorry image is not available</p>";
  }
}

window.onload = async function () {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  const breeds = data.message;
  const select = document.getElementById("breeds");

  for (const breed in breeds) {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    select.appendChild(option);
  }
};
