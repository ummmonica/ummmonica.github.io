// global variable to store the quote to retrieve author info from
let currentQuote;
let quoteId;
// display author button selected
document.querySelector("#authorBtn").addEventListener("click", displayAuthor);
// display translation to quote
document.querySelector("#translateBtn").addEventListener("click", translateQuote);
// gets quote from user's entered textbox
document.querySelector("#quotesBtn").addEventListener("click", getQuote);
// event listener here for when page refreshes to call function to set different background
window.addEventListener("load", function() {
    // randomize radio buttons
    randomizeButtons();
    displayQuote();
    displayBackground();
});

// function to display quote every time page is reloaded
async function displayQuote() {
    let url = `https://csumb.space/api/famousQuotes/getRandomQuote.php`;
    let response = await fetch(url);
    let data = await response.json();

    console.log("Quote data: ", data);

    // track quoteId to be able to translate later
    quoteId = data.quoteId;

    // store current quote so author info displays pic correctly
    currentQuote = data;

    // display quote and author
    document.querySelector("#displayQuote").innerHTML = `"${data.quoteText}`;
    document.querySelector("#displayAuthor").innerHTML = ` - ${data.firstName} ${data.lastName}`;
}

function randomizeButtons() {
    let languages = [
        // adding 'code' because that is what the API takes
        {name: "Esperanto", code: "ES"},
        {name: "English", code: "EN"},
        {name: "Spanish", code: "SP"},
        {name: "French", code: "FR"} ];
    
    languages = _.shuffle(languages);

    for (let i = 0; i < languages.length; i++) {
        document.querySelector("#translationLanguages").innerHTML += `<input type = "radio" name = "translationLanguages" id = "${languages[i].code}" value = "${languages[i].code}"> <label for = "${languages[i].code}"> ${languages[i].name} </label>`;
    }
}

// to display author info
function displayAuthor() {
    console.log("Author data: ", currentQuote);

    // display author photo
    document.querySelector("#authorPic").src = currentQuote.picture;

    // display author bio
    document.querySelector("#authorBio").innerHTML = currentQuote.bio;

    // display author info
    document.querySelector("#authorInfo").style.display = "block";
}

// to display translation to quote
async function translateQuote() {
    // get the selected lang from user
    let selectedLang = document.querySelector('input[name="translationLanguages"]:checked');

    // ensure user selected a language
    if (!selectedLang) {
        // TODO: remove this alert
        alert("Please select a language!");
        return;
    }

    // get the value of the selected language
    let lang = selectedLang.value;

    // replace # with ${quoteId} and abbrev of language
    let url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=${lang}&quoteId=${quoteId}`;
    let response = await fetch(url);
    let data = await response.json();

    console.log("translation: ", data);

    // display translated quote
    document.querySelector("#translatedQuote").innerHTML = `<strong>Translation:</strong> "${data.translation}"`;

    // display the relevant flag
    let flagImages = {
        "ES": "img/esperanto_flag.png",
        "EN": "img/english_flag.png",
        "SP": "img/spanish_flag.png",
        "FR": "img/french_flag.png" 
    };

    document.querySelector("#flag").src = flagImages[lang];
    document.querySelector("#flagContainer").style.display = "block";
 }

// gets number of quotes based on user's input. must be #1-5
async function getQuote() {
    // get value from user
    let num = document.querySelector("#num").value;
    let searchError = document.querySelector("#searchError");

    // ensure a value is entered by user
    if (!validate(num)) {
        return;
    }

    // clear search error message
    searchError.innerHTML = "";

    // replace num with ${3} with n
    let url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${num}`;
    let response = await fetch(url);
    let data = await response.json();

    console.log("Quotes: ", data);

    // create a template to add to
    let quotes = "<h3>Quotes:</h3>";

    // print the quotes by cat
    for (let i = 0; i < data.length; i++) {
        quotes += `<div class = "quotes">
                    <p>"${data[i].quoteText}"</p>
                    <p><em>- ${data[i].firstName} ${data[i].lastName}</em></p>
                   </div>`;
    }
    document.querySelector("#numQuotes").innerHTML = quotes;
}

// displays a different background everytime the page reloads
async function displayBackground() {
    // replace with {} for 'flowers'
    let url = `https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers`;
    let response = await fetch(url);
    let data = await response.json();

    // to generate random image
    let randomX = Math.floor(Math.random() * data.hits.length);
    let imageURL = data.hits[randomX].largeImageURL;

    // set the background
    document.body.style.backgroundImage = `url('${imageURL}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
}

// funtion to validate
function validate() {
    let searchError = document.querySelector("#searchError");
    let numInput = document.querySelector("#num");

    // checks if user entered a value into text box
    if (numInput == ""){
        searchError.innerHTML = "A value between 1 through 5 to get a quote";
        searchError.style.color = "red";
        return false;
    }

    // must convert the input into a number
    let num = parseInt(numInput);

    // checks that value entered by user is between 1 - 5
    if (num > 5 || num < 1) {
        searchError.innerHTML = "Please enter a value between 1 through 5";
        searchError.style.color = "red";
        return false;
    }

    return true;
}