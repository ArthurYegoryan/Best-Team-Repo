async function makeRequest() {
    printResultSectionContextElem.innerHTML = "";

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
    searchingInterface.style.marginTop = "60px";
    printResultSectionContextElem.style.backgroundColor = "white";

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