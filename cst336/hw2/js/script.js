// event listener for button
document.querySelector("button").addEventListener("click", gradeQuiz);

// global variable
var score = 0;
var attempts = localStorage.getItem("totalAttempts");

// to randomize question 4
displayQ4Choices();

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += `<input type = "radio" name = "q4" id = "${q4ChoicesArray[i]}" value = "${q4ChoicesArray[i]}"> <label for = "${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]} </label> `;
    }
    
}

// randomize q9
displayQ9Choices();

function displayQ9Choices() {
    let q9ChoicesArray = ["$10 million", "$15 million", "$20 million", "$25 million"];
    
    q9ChoicesArray = _.shuffle(q9ChoicesArray);

    for (let i = 0; i < q9ChoicesArray.length; i++) {
        document.querySelector("#q9Choices").innerHTML += `<input type = "radio" name = "q9" id = "${q9ChoicesArray[i]}" value = "${q9ChoicesArray[i]}"> <label for = "${q9ChoicesArray[i]}"> ${q9ChoicesArray[i]} </label> `;
    }
    
}


// Ensure an answer is made
function isFormValid() {
    let isValid = true;

    if (document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }

    return isValid;
}

// For when answer is correct
function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "text-success ";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src = 'img/checkmark.png' alt = 'checkmark'>";
    score += 20;
}

// For when answer is wrong
function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "text-warning";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src = 'img/xmark.png' alt = 'xmark'>";
}

// Displays total score after
function gradeQuiz () {
    console.log("Grading quiz...");

    // resets validation feedback
    document.querySelector("#validationFdbk").innerHTML = "";

    if (!isFormValid()) {
        return;
    }

    // removing 'let' makes it global
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name = q4]:checked").value;
    let q5Response = document.querySelector("#q5").value.toLowerCase();
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("#q7").value;
    let q9Response = document.querySelector("input[name = q9]:checked").value;
    let q10Response = document.querySelector("input[name = q10]:checked").value;

    console.log(q1Response);
    console.log(q2Response);

    // Q1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }

    // Q2
    if (q2Response == "mo") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }

    // Q3
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked 
        && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
            rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }

    // Q4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    }
    else {
        wrongAnswer(4);
    }

    // Q5
    if (q5Response == "mayflower") {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }

    // Q6
    if (q6Response == "sa") {
        rightAnswer(6);
    }
    else {
        wrongAnswer(6);
    }

    // Q7
    if (q7Response == "1770") {
        rightAnswer(7);
    }
    else {
        wrongAnswer(7);
    }

    // Q8
    if (document.querySelector("#Japan").checked && document.querySelector("#Italy").checked 
        && !document.querySelector("#Kingdom").checked && !document.querySelector("#France").checked) {
            rightAnswer(8);
    }
    else {
        wrongAnswer(8);
    }   

    // Q9
    if (q9Response == "$15 million") {
        rightAnswer(9);
    }
    else {
        wrongAnswer(9);
    }

    // Q10
    if (q10Response == "France") {
        rightAnswer(10);
    }
    else {
        wrongAnswer(10);
    }

    // score > 80 = green, else red.
    if (score < 80) {
        document.querySelector("#totalScore").innerHTML = (`Total Score: ${score}`);
        document.querySelector("#totalScore").className = "text-danger";
    }
    else {
        document.querySelector("#totalScore").innerHTML = (`Total Score: ${score} - NICE JOB!`);
        document.querySelector("#totalScore").className = "text-success";
    }

    

    // Display tota number of attempts
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;

    // update lcoal storage variable
    localStorage.setItem("totalAttempts", attempts);
}


