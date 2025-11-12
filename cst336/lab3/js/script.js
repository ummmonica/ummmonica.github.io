// use 'change' instead of 'click' because then alert keeps popping up

// event listener from zip code (this will fill out other sections)
document.querySelector("#zip").addEventListener("change", displayCity);
// event listener from state (this will generate the 'county' section)
document.querySelector("#state").addEventListener("change", displayCounties);

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

    // display city name from this zipcode
    document.querySelector("#city").innerHTML = data.city;

    // display latitude from this zipcode
    document.querySelector("#latitude").innerHTML = data.latitude;

    // display longitude from this zipcode
    document.querySelector("#longitude").innerHTML = data.longitude;
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