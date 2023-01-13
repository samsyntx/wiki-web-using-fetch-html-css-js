let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearch(result) {
    let {
        title,
        link,
        description
    } = result;
    let makingDivEl = document.createElement("div");
    searchResults.appendChild(makingDivEl);

    let makingAncorHeading = document.createElement("a");
    makingAncorHeading.textContent = title;
    makingAncorHeading.href = link;
    makingAncorHeading.target = "_blank";
    makingAncorHeading.classList.add("result-title");
    makingDivEl.appendChild(makingAncorHeading);

    let makingBrEl = document.createElement("br");
    makingDivEl.appendChild(makingBrEl);

    let makingURLEl = document.createElement("a");
    makingURLEl.textContent = link;
    makingURLEl.href = link;
    makingURLEl.target = "_blank";
    makingURLEl.classList.add("result-url");
    makingDivEl.appendChild(makingURLEl);

    let makingBrLink = document.createElement("br");
    makingDivEl.appendChild(makingBrLink);

    let makingDescription = document.createElement("p");
    makingDescription.textContent = description;
    makingDescription.classList.add("link-description");
    makingDivEl.appendChild(makingDescription);

    let makingLine = document.createElement("hr");
    makingDivEl.appendChild(makingLine);
}

function displayResult(searchResults) {
    for (let result of searchResults) {
        createAndAppendSearch(result);
    }
}

function getSearchResult(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        searchResults.textContent = "";

        let inputValue = searchInput.value;
        let options = {
            method: "GET"
        };
        fetch("https://apis.ccbp.in/wiki-search?search=" + inputValue, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                spinner.classList.add("d-none");
                displayResult(search_results);
            });
    }
}

searchInput.addEventListener("keydown", getSearchResult);
