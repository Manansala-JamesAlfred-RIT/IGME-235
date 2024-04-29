// 1
window.onload = (e) => { document.querySelector("#search").onclick = searchButtonClicked };

// 2
let displayTerm = "";

// 3
function searchButtonClicked() {
    console.log("searchButtonClicked() called");

    // Typing code from Homework github Document

    // 1st
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    // 2nd - key from document
    let GIPHY_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";

    // 3rd
    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    // 4th - Parsing user entered term to search
    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    // 5th - Getting rid of any leading and trailing spaces
    term = term.trim();

    // 6th - Encoding spaces and special characters
    term = encodeURIComponent(term);

    // 7th - Bails out of function if no term to search.
    if (term.length < 1) return;

    // 8th - Appending search term to the URL.
    url += "&q=" + term;

    // 9th - Grabbing user chosen search limit from select and appending it to URL
    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    // 10th Update UI
    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b";

    // 11th - See what URL looks like (in the dev tools console)
    console.log(url);

    // 12th - Requesting Data
    getData(url);
}

// Implementation of GetData function
function getData(url) {

    // 1st - Creating a new XHR object
    let xhr = new XMLHttpRequest();

    // 2nd - Setting onload handler
    xhr.onload = dataLoaded;

    // 3rd - Setting onerror handler
    xhr.onerror = dataError;

    // 4th - Open connection and send the request
    xhr.open("GET", url);
    xhr.send();
}

// Callback functions
function dataLoaded(e) {
    // 5th - event.target is the XHR object
    let xhr = e.target;

    // 6th - xhr.responseText is the JSON file downloaded
    console.log(xhr.responseText);

    // 7th - Turn text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);

    // 8th - If no results, print a message and return.
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
        // Bail out
        return;
    }

    // 9th - Start building HTML string to display to user
    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "";

    // 10th - Looping through the array of results
    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        // 11th - Getting the URL to the GIF
        let smallURL = result.images.fixed_width_downsampled.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        // 12th - Getting URL to the GIPHY page
        let url = result.url;

        // GETTING RATING OF GIF
        let rating = (result.rating ? result.rating : "NA").toUpperCase();

        // 13th - Build a <div> to hold each result - ES6 String Templating
        let line = `<div class='result'>`;
        line += `<img src='${smallURL}' title='${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a>`;
        line += `<p>Rating: ${rating}</span>`;
        line += `</div>`;
        // 15th - Adding the <div> to 'bigString' and loop
        bigString += line;
    }

    // 16th - Show the complete HTML build to the user!
    document.querySelector("#content").innerHTML = bigString;

    // 17th - Updating the status
    document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
}

// Logging if error
function dataError(e) {
    console.log("An error occured");
}