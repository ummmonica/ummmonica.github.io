// use 'change' instead of 'click' because then alert keeps popping up

// event listener from zip code (this will fill out other sections)
document.querySelector("#zip").addEventListener("change", displayCity);
// event listener from state (this will generate the 'county' section)
document.querySelector("#state").addEventListener("change", displayCounties);
// event listener to check if a username is available
document.querySelector("#username").addEventListener("change", checkUsername);
// event listener to validate form. requires a parameter
document.querySelector("#signupForm").addEventListener("submit", function(event) {validateForm(event)});

// display city from web API after zip code entered
async function displayCity() {
    // alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;
    console.log(zipCode);

    // fetching APIs
    // 'await' prevents moving on without getting the data
    let url =  `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if (data.city) {
        // display city name from this zipcode
        document.querySelector("#city").innerHTML = data.city;
        // display latitude from this zipcode
        document.querySelector("#latitude").innerHTML = data.latitude;
        // display longitude from this zipcode
        document.querySelector("#longitude").innerHTML = data.longitude;        
    }
    // zipcode is invalid if no info populates from API
    else {
        // making empty for validate function
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
    }

}

// To display counties from web API
async function displayCounties() {
    let state = document.querySelector("#state").value;

    // fetching web APIs
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch (url);
    let data = await response.json();

    let countyList = document.querySelector("#county");

    // To allow resetting of County dropdown menu
    countyList.innerHTML = "<option> Select County </option>"

    // loop to display all the counties for a state
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;

    // fetching APIs
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");

    if (data.available) {
        usernameError.innerHTML = " Username Available!";
        usernameError.style.color = "green";
    }
    else {
        usernameError.innerHTML = " Username Taken";
        usernameError.style.color = "red";
    }
}

function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let passOne = document.querySelector("#passOne").value;
    let passTwo = document.querySelector("#passTwo").value;
    let city = document.querySelector("#city").innerHTML; // because has no value, it prints the city from API
    let zipcode = document.querySelector("#zip").value;

    // to clear errors after requirement is met
    document.querySelector("#usernameError").innerHTML = "";
    document.querySelector("#passwordError").innerHTML = "";
    document.querySelector("#zipError").innerHTML = "";

    // // check that a zipcode is entered
    // if (zipcode.length < 5) {
    //     document.querySelector("#zipError").innerHTML = "Please enter a zip code";
    //     document.querySelector("#zipError").style.color = "red";
    // }

    // // check if zipcode is valid by whether or not a city is populated
    // if (city.trim().length == 0) {
    //     document.querySelector("#zipError").innerHTML = "Please enter a valid zipcode!";
    //     document.querySelector("#zipError").style.color = "red";

    //     isValid = false;
    // }

    // check for username
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";

        document.querySelector("#usernameError").style.color = "red";

        isValid = false;
    }

    // check password length
    if (passOne.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters long!";
        document.querySelector("#passwordError").style.color = "red";

        isValid = false;
    }

    // check password matches
    if (passOne != passTwo) {
        document.querySelector("#passwordError").innerHTML = "Passwords must match!";
        document.querySelector("#passwordError").style.color = "red";

        isValid = false;
    }

    // prevents moving on without complete data
    if (!isValid) {
        e.preventDefault();
    }
}