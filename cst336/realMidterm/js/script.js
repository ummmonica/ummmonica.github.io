let option;

document.querySelector("#likeBtn").addEventListener("click", likeFeedbck);
document.querySelector("#dislikeBtn").addEventListener("click", dislikeFeedbck);
document.querySelector("#commentBtn").addEventListener("click", displayComments);
document.querySelector("#questionsBtn").addEventListener("click", displayQuestions);
document.querySelector("#reportsBtn").addEventListener("click", displayReports);

async function likeFeedbck() {
    let url = `https://csumb.space/api/videoLikes.php?videoId=xyz`;
    let response = await fetch(url);
    let data = await response.json();

    // option = data;

    console.log("likes: ", data);

    // change liked button to turn blue

    // show count. TODO: should only display if selected
    document.querySelector("#likes").innerHTML = `${data.likes}`;
}

async function dislikeFeedbck() {
    // change disliked button to gray
    let url = `https://csumb.space/api/videoLikes.php?videoId=xyz`;
    let response = await fetch(url);
    let data = await response.json();


    console.log("dislikes: ", data);

    // show count
    document.querySelector("#dislikes").innerHTML = `${data.dislikes}`;
}

async function displayComments() {
    let url = `https://csumb.space/api/videoLikes.php?videoId=xyz&action=comments`;
    let response = await fetch(url);
    let data = await response.json();

    console.log("comments ", data);

    let comments = "<h2>Comments:</h2>";

    for (let i = 0; i < data.length; i++) {
        comments += `<div class = "comments">
            <p> ${data[i].author} ${data[i].date} </p>
            <p> ${data[i].comment} </p>
            <p> ${data[i].rating} </p> <br>
        </div>`;

        document.querySelector("#comments").innerHTML = comments;
    }


}

async function displayQuestions() {


}

async function displayReports() {

    let url = `https://csumb.space/api/videoLikes.php?videoId=xyz&action=report`;
    let response = await fetch(url);
    let data = await response.json();
    
    console.log("report: ", data);
    let options = document.querySelector("#reportsDisplay");

    for (let i = 0; i < data.length; i ++) {
        options += `<option value="${data[i].reasons}></options>`;
    }
    // document.querySelector("#reportsDisplay").innerHTML = options;

}


// <iframe width="560" height="315" src="https://www.youtube.com/embed/4ww2wyaEuX4?si=AiLa6kb6ShU93_Dc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>