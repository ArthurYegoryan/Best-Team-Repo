async function makeRequest() {
    printResultSectionContextElem.innerHTML = "";
    pageManagementDivElem.style.display = "none";

    try {
        let data;
        const concatedTitle = makeTitleForRequest(inputTitle);
        const requestCall = await fetch(generalURL + concatedTitle + paginationURLPeace + pageNumber);

        if (books.includes(concatedTitle)) {
            if (pageInfos[pageNumber]) {
                data = pageInfos[pageNumber];
            } else {
                const response = requestCall;
                data = await response.json();
    
                pageInfos[pageNumber] = data;           
            }
        } else {
            const response = requestCall;

            if (response.status >= 200 && response.status <= 299) {
                data = await response.json();

                if (data.numFound) {
                    books.push(concatedTitle);
                    pageInfos[pageNumber] = data;
                } else {
                    throw new Error("Sorry, the book was not found!");
                }
            } else if (response.status === 404) {
                throw new Error("404 error");
            }
        }

        printResponseInfo(data);        
    } catch (err) {
        if (err.message === "404 error") {
            show404Error();
        } else {
            printResultSectionContextElem.innerHTML = "";
            printResultSectionContextElem.style.padding = "0";

            const showErrorElem = document.createElement("div");
            showErrorElem.classList.add("show-error");

            const errorImgAreaElem = document.createElement("div");
            errorImgAreaElem.classList.add("error-image-area");
            const errorImgElem = document.createElement("img");
            errorImgElem.setAttribute("src", "./img/error.webp");
            errorImgElem.setAttribute("alt", "Error image");

            const errorTextAreaElem = document.createElement("div");
            errorTextAreaElem.classList.add("error-text-area");
            const errorTextElem = document.createElement("h3");
            errorTextElem.textContent = err.message;

            errorImgAreaElem.appendChild(errorImgElem);
            errorTextAreaElem.appendChild(errorTextElem);
            showErrorElem.appendChild(errorImgAreaElem);
            showErrorElem.appendChild(errorTextAreaElem);
            printResultSectionContextElem.appendChild(showErrorElem);
        }        
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
    searchingInterface.style.marginTop = "60px";
    printResultSectionContextElem.style.backgroundColor = "white";
    printResultSectionContextElem.style.padding = "10px 30px";

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

    printResultSectionContextElem.appendChild(numFoundElement);
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
    printResultSectionContextElem.appendChild(resultElement);

    maxPageNumber = Math.ceil(data.numFound / 100);

    pageNumberInputElem.setAttribute("min", 1);
    pageNumberInputElem.setAttribute("max", maxPageNumber);

    pageManagementDivElem.style.display = "block";
}

function show404Error() {
    printResultSectionContextElem.innerHTML = "";
    printResultSectionContextElem.style.padding = "0";
    searchingInterface.style.marginTop = "60px";

    const showErrorElem = document.createElement("div");
    showErrorElem.classList.add("show-404-error");

    const errorImgElem = document.createElement("img");
    errorImgElem.setAttribute("src", "./img/error404.webp");
    errorImgElem.setAttribute("alt", "404 Error image");

    showErrorElem.appendChild(errorImgElem);
    printResultSectionContextElem.appendChild(showErrorElem);
}