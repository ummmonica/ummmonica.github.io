let randomNumber;
let attempts = 0;
let totalWins = 0;
let totalLosses = 0;

//  Event listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumer: " + randomNumber);

    // reset all variables
    attempts = 0;

    // to hide reset button
    document.querySelector("#resetBtn").style.display = "none";

    // show the 'guess button' again
    document.querySelector("#guessBtn").style.display = "inline";

    // so user won't need to click inside the textbox
    document.querySelector("#playerGuess").focus();

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    // clearing the feedback
    feedback.textContent = "";

    // clear previous guess 
    document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
    // refer to html 'feedback'. this gets rid of 'alert's
    let feedback = document.querySelector("#feedback");
 
    // clear the feedback
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;

    console.log("Player guess: " + guess);

    attempts++;

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";

        return;
    }

    console.log("Attempts: " + attempts);

    feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";

        totalWins++;

        gameOver();
    }

    else {
        document.querySelector("#guesses").textContent += guess + " ";

        // Display number of attempts left
        document.querySelector("#guesses_left").textContent = (7 - attempts);

        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "red";

            totalLosses++;

            gameOver();
        }

        else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        }

        else {
            feedback.textContent= "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");

    // hides Guess button
    guessBtn.style.display = "none";

    // displays Reset button
    resetBtn.style.display = "inline";

    score();
}

// display the total wins/losses
function score() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "Total Wins: " + totalWins + " || Total Losses: " + totalLosses;
}