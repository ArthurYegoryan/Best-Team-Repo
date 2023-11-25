const generalURL = "http://openlibrary.org/search.json?q=";
const paginationURLPeace = "&page=";

const searchingInterfaceElem = document.querySelector("#searching-interface");
const bookSearchFormElem = document.querySelector("#book-search-form");
const titlePlaceInputElem = document.querySelector("#title-place");
const printResultSectionContextElem = document.querySelector("#print-result-section-context");
const pageManagementDivElem = document.querySelector("#page-management-section")
const pageNumberInputElem = document.querySelector("#page-number");
const goPageButtonElem = document.querySelector("#go-page-button");
const prevPageButtonElem = document.querySelector("#prev-page-button");
const nextPageButtonElem = document.querySelector("#next-page-button");

const books = [];
const pageInfos = {};

let inputTitle = "";
let pageNumber = 1;
let maxPageNumber;

titlePlaceInputElem.addEventListener("keyup", function() {
    inputTitle = titlePlaceInputElem.value;
});

bookSearchFormElem.addEventListener("submit", (event) => {
    event.preventDefault();
    makeRequest();
});

pageNumberInputElem.addEventListener("change", function() {
    pageNumber = pageNumberInputElem.value;
});

goPageButtonElem.addEventListener("click", function(event) {
    event.preventDefault();
    makeRequest();
});

prevPageButtonElem.addEventListener("click", function(event) {
    event.preventDefault();
    if (pageNumber - 1 < 1) pageNumber = 1;
    else pageNumber--;
    makeRequest();
});

nextPageButtonElem.addEventListener("click", function(event) {
    event.preventDefault();
    if (pageNumber + 1 > maxPageNumber) pageNumber = maxPageNumber;
    else pageNumber++;
    makeRequest();
});