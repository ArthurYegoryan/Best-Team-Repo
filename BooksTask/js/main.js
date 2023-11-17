const generalURL = "http://openlibrary.org/search.json?q=";
const paginationURLPeace = "&page=";

const searchFormElement = document.querySelector("#book-search-form");
const titlePlace = document.querySelector("#title-place");
const printResultSection = document.querySelector("#print-result-section");
const pageManagementSectionElement = document.querySelector("#page-management-section")
const inputPageNumber = document.querySelector("#page-number");

let inputTitle = "";
let pageNumber = 1;

titlePlace.addEventListener("keyup", function() {
    inputTitle = titlePlace.value;
});

searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    makeRequest();
})

async function makeRequest() {
    printResultSection.innerHTML = "";

    try {
        const response = await fetch(generalURL + makeTitleForRequest(inputTitle) + paginationURLPeace + pageNumber);
        const data = await response.json();

        printResponseInfo(data);
        
    } catch (err) {
        console.error(err.message);
    }    
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

function printResponseInfo(data) {
    const numFoundElement = document.createElement('h3');
    numFoundElement.classList.add("num-found");
    numFoundElement.textContent = `Search results number: ${data.numFound}`;

    const resultElement = document.createElement('div');
    resultElement.classList.add("result");

    const titleElement = document.createElement('p');
    titleElement.classList.add("result-title-info");
    titleElement.textContent = `Title: ${data.docs[0].title}`;

    const authorNameElement = document.createElement('p');
    authorNameElement.classList.add("result-author-name-info");
    authorNameElement.textContent = `Author name: ${data.docs[0].author_name}`;

    const firstPublishYearElement = document.createElement('p');
    firstPublishYearElement.classList.add("result-first-publish-year-info");
    firstPublishYearElement.textContent = `First publish year: ${data.docs[0].first_publish_year}`;

    const subjectsTitleElement = document.createElement('p');
    subjectsTitleElement.classList.add("result-subjects-title-info");
    subjectsTitleElement.textContent = "Subjects (first 5):";

    printResultSection.appendChild(numFoundElement);
    resultElement.appendChild(titleElement);
    resultElement.appendChild(authorNameElement);
    resultElement.appendChild(firstPublishYearElement);
    resultElement.appendChild(subjectsTitleElement);

    const subjectsElement = document.createElement('div');
    subjectsElement.classList.add("result-subjects-info");
    subjectsElement.style.marginLeft = "20px"
    for (let i = 0; i < 5; i++) {
        const subjectElement = document.createElement('p');
        subjectElement.classList.add("result-subject-info");
        subjectElement.textContent = data.docs[0].subject[i];
        subjectsElement.appendChild(subjectElement);
    }

    resultElement.appendChild(subjectsElement);
    printResultSection.appendChild(resultElement);

    inputPageNumber.setAttribute("min", 1);
    inputPageNumber.setAttribute("max", Math.ceil(data.numFound / 100));
    pageManagementSectionElement.style.display = "block";
}