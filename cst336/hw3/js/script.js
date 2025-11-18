// event listeners for character's name
document.querySelector("#characters").addEventListener("click", loadCharacters);
document.querySelector("#searchForm").addEventListener("submit", function(event) {
    // this is needed to prevent page refresh
    event.preventDefault();
    searchCharacters();
});

// load characters from API
async function loadCharacters() {
    let url = `https://rickandmortyapi.com/api/character`;
    let response = await fetch (url);
    let data = await response.json();

    displayCharacters(data.results);
}

// to search for characters by NAME
async function searchCharacters() {
    let searchName = document.querySelector("#input").value;

    // check if textbox is empty
    if (searchName == "") {
        alert("Please enter a character name");
        return;
    }

    // fetch data from API
    let url = `https://rickandmortyapi.com/api/character/?name=` + searchName;
    let response = await fetch (url);
    let data = await response.json();

    // display search results
    displayCharacters(data.results);
}

// display all characters on webpage
function displayCharacters(characters) {
    let container = document.querySelector("#container");
    let template = document.querySelector("#template");

    // clear existing contents
    container.innerHTML = "";

    // maintain template in container
    container.appendChild(template);

    // loop through available characters
    for (let i = 0; i < characters.length; i++) {
        // make a copy of the template
        let copy = template.cloneNode(true);

        // to make visible
        copy.style.display = "block";
        copy.removeAttribute("id");

        copy.querySelector(".image").src = characters[i].image;
        copy.querySelector(".image").alt =  characters[i].name; // ensure the name is pulled for image alt
        copy.querySelector(".name").innerHTML = characters[i].name;
        copy.querySelector(".status").innerHTML = characters[i].status;
        copy.querySelector(".species").innerHTML = characters[i].species;
        copy.querySelector(".gender").innerHTML = characters[i].gender;
        copy.querySelector(".origin").innerHTML = characters[i].origin.name;
        copy.querySelector(".location").innerHTML = characters[i].location.name;

        // add this to container created
        container.appendChild(copy);
    }
}