const generalURL = "http://openlibrary.org/search.json?q=";
const paginationURLPeace = "&page=";

const formElement = document.querySelector("form");
const titlePlace = document.querySelector("#title-place");
const printResultSection = document.querySelector(".test-print-result-section");

let inputTitle = "";
titlePlace.addEventListener("keyup", function() {
    inputTitle = titlePlace.value;
});

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    makeRequest();
})

async function makeRequest() {
    printResultSection.innerHTML = "";

    try {
        const response = await fetch(generalURL + makeTitleForRequest(inputTitle));
        const data = await response.json();
        const result = await data.docs[0].seed.filter(seed => seed.startsWith("/subjects"));
        
        result.map((subject => {
            const subjectShower = document.createElement('p');
            subjectShower.classList.add("subject");
            subjectShower.textContent = subject;

            printResultSection.appendChild(subjectShower);
        }));
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