const generalURL = "http://openlibrary.org/search.json?q=";
const paginationURLPeace = "&page=";

const searchButton = document.querySelector("#search-button");
const titlePlace = document.querySelector("#title-place");

let inputTitle = "";
titlePlace.addEventListener("keyup", function() {
    inputTitle = titlePlace.value;
});

searchButton.addEventListener("click", function() {
    const seeds = makeRequest(generalURL + makeTitleForRequest(inputTitle));
    console.log(seeds);
});

async function makeRequest(url) {
    const seeds = [];
    
    await fetch(url)
        .then(response => response.json())
        .then(result => result.docs[0].seed.filter(seed => seed.startsWith("/subjects")))
        .then(result => result.map(subject => seeds.push(subject)))
        .catch(error => console.log(error.message));

    return seeds;
}

function makeTitleForRequest(title) {
    let titleForRequest = "";

    for (let i = 0; i < title.length; i++) {
        if (title[i] === " ") {
            titleForRequest += "+";
        } else {
            titleForRequest += title[i].toLowerCase();
        }
    }

    return titleForRequest.trim();
}