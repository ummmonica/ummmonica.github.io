// event listeners for character's name
document.querySelector("name").addEventListener("change", displayInfo);

async function displayInfo() {
    let info = document.querySelector("#name").value;
}