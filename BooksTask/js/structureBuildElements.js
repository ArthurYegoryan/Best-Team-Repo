const body = document.querySelector("body");

// Header
const header = document.createElement("header");
const logoNameDiv = document.createElement("div");
logoNameDiv.classList.add("logo-name");
const imgLogo = document.createElement("img");
imgLogo.setAttribute("src", "./img/logo-books.webp");
imgLogo.setAttribute("alt", "logo-name");

logoNameDiv.appendChild(imgLogo);
header.appendChild(logoNameDiv);
body.appendChild(header);

// adding a tag to the logo name div to make it a link to the landing page
const logoLink = document.createElement("a");
logoLink.setAttribute("href", "../Landing.html");
logoLink.appendChild(imgLogo);
logoNameDiv.appendChild(logoLink);
header.appendChild(logoNameDiv);
body.appendChild(header);

// Main search interface section
const main = document.createElement("main");
const searchingInterface = document.createElement("section");
searchingInterface.setAttribute("id", "searching-interface");
const searchQuestionTextDiv = document.createElement("div");
searchQuestionTextDiv.setAttribute("id", "search-question-text");
searchQuestionTextDiv.textContent = "What kind of book do you want to search?";

const searchInputDiv = document.createElement("div");
searchInputDiv.classList.add("search-input");
const bookSearchForm = document.createElement("form");
bookSearchForm.setAttribute("action", "");
bookSearchForm.setAttribute("name", "");
bookSearchForm.setAttribute("id", "book-search-form");
const titlePlaceInput = document.createElement("input");
titlePlaceInput.setAttribute("type", "text");
titlePlaceInput.setAttribute("placeholder", "Please enter book title");
titlePlaceInput.setAttribute("name", "title");
titlePlaceInput.setAttribute("id", "title-place");
titlePlaceInput.setAttribute("required", "");

const searchButton = document.createElement("button");
searchButton.setAttribute("id", "search-button");
searchButton.textContent = "Search";

bookSearchForm.appendChild(titlePlaceInput);
bookSearchForm.appendChild(searchButton);
searchInputDiv.appendChild(bookSearchForm);
searchingInterface.appendChild(searchQuestionTextDiv);
searchingInterface.appendChild(searchInputDiv);
main.appendChild(searchingInterface);

// Main response show section
const responseShowSection = document.createElement("section");
responseShowSection.setAttribute("id", "response-show");
const printResultDiv = document.createElement("div");
printResultDiv.setAttribute("id", "print-result-section");
const printResultSectionContext = document.createElement("div");
printResultSectionContext.setAttribute("id", "print-result-section-context");

const pageManagementDiv = document.createElement("div");
pageManagementDiv.setAttribute("id", "page-management-section");
const goPageForm = document.createElement("form");
goPageForm.setAttribute("action", "");
goPageForm.setAttribute("name", "");
goPageForm.setAttribute("id", "go-page-form");
const pageNumberInput = document.createElement("input");
pageNumberInput.setAttribute("type", "number");
pageNumberInput.setAttribute("placeholder", "1");
pageNumberInput.setAttribute("id", "page-number");

const goPageButton = document.createElement("button");
goPageButton.setAttribute("id", "go-page-button");
goPageButton.textContent = "GO!";

const prevPageButton = document.createElement("button");
prevPageButton.setAttribute("id", "prev-page-button");
prevPageButton.textContent = "Previous page";

const nextPageButton = document.createElement("button");
nextPageButton.setAttribute("id", "next-page-button");
nextPageButton.textContent = "Next page";

goPageForm.appendChild(pageNumberInput);
goPageForm.appendChild(goPageButton);
pageManagementDiv.appendChild(goPageForm);
pageManagementDiv.appendChild(prevPageButton);
pageManagementDiv.appendChild(nextPageButton);
printResultDiv.appendChild(printResultSectionContext);
responseShowSection.appendChild(printResultDiv);
responseShowSection.appendChild(pageManagementDiv);
main.appendChild(responseShowSection);
body.appendChild(main);
