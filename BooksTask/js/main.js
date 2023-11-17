const generalURL = "http://openlibrary.org/search.json?q=";
const paginationURLPeace = "&page=";

const searchFormElement = document.querySelector("#book-search-form");
const titlePlace = document.querySelector("#title-place");
const printResultSectionContext = document.querySelector("#print-result-section-context");
const pageManagementSectionElement = document.querySelector("#page-management-section")
const inputPageNumber = document.querySelector("#page-number");
const goPageButton = document.querySelector("#go-page-button");
const prevPageButton = document.querySelector("#prev-page-button");
const nextPageButton = document.querySelector("#next-page-button");

const pageInfos = {};

let inputTitle = "";
let pageNumber = 1;
let maxPageNumber;

titlePlace.addEventListener("keyup", function() {
    inputTitle = titlePlace.value;
});

searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    makeRequest();
});

inputPageNumber.addEventListener("change", function() {
    pageNumber = inputPageNumber.value;
});

goPageButton.addEventListener("click", function(event) {
    event.preventDefault();
    makeRequest();
});

prevPageButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (pageNumber - 1 < 1) pageNumber = 1;
    else pageNumber--;
    makeRequest();
})

nextPageButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (pageNumber + 1 > maxPageNumber) pageNumber = maxPageNumber;
    else pageNumber++;
    makeRequest();
})

async function makeRequest() {
    printResultSectionContext.innerHTML = "";

    try {
        let data;

        if (pageInfos[pageNumber]) {
            data = pageInfos[pageNumber];
        } else {
            const response = await fetch(generalURL + makeTitleForRequest(inputTitle) + paginationURLPeace + pageNumber);
            data = await response.json();
            pageInfos[pageNumber] = data;
        }        

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

    printResultSectionContext.appendChild(numFoundElement);
    resultElement.appendChild(titleElement);
    resultElement.appendChild(authorNameElement);
    resultElement.appendChild(firstPublishYearElement);
    resultElement.appendChild(subjectsTitleElement);

    const subjectsElement = document.createElement('div');
    subjectsElement.classList.add("result-subjects-info");
    subjectsElement.style.marginLeft = "20px"

    if (data.docs[0].subject) {
        for (let i = 0; i < data.docs[0].subject.length; i++) {
            if (i === 5) break;
    
            const subjectElement = document.createElement('p');
            subjectElement.classList.add("result-subject-info");
            subjectElement.textContent = data.docs[0].subject[i];
            subjectsElement.appendChild(subjectElement);
        }
    } else {
        const subjectElement = document.createElement('p');
        subjectElement.classList.add("result-subject-info");
        subjectElement.textContent = "No subjects";
        subjectsElement.appendChild(subjectElement);
    }

    resultElement.appendChild(subjectsElement);
    printResultSectionContext.appendChild(resultElement);

    maxPageNumber = Math.ceil(data.numFound / 100);

    inputPageNumber.setAttribute("min", 1);
    inputPageNumber.setAttribute("max", maxPageNumber);

    // if (pageNumber === 1) prevPageButton.style.display = "none";
    // if (pageNumber === maxPageNumber) nextPageButton.style.display = "none";

    pageManagementSectionElement.style.display = "block";
}