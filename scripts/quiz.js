//Array for Quiz questions, available choices, and correct answers     
var questions = [{
        title: "Commonly used data type Do Not include:",
        choices: ["strings","booleance","alerts", "numbers"],
        answer : "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within:---",
        choices: ["quotes","Curly brackets","parentheses", "square brackets"],
        answer : "parentheses"
    },
    {
        title: " Which built-in method returns the characters in a string beginning at the specified location?",
        choices: ["substr( )", "getSubstring( )", "slice( )", "None of the above."],
        answer: "substr( )"
    },
    {
        title: "Which of the following function of an array object adds and/or removes elements from an array?",
        choices: ["toSource( )", "sort( )", "unshift( )", "splice( )"],
        answer: "splice( )"
    },
    {
        title: "String values must be enclosed within --- when being assigned to variables ",
        choices: ["commas","curly brackets","quotes","parentheses"],
        answer : "quotes" 
    }
]

//set variables for the functions, scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//start the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    //Change the HTML content of element with id="timeLeft":
    document.getElementById("timeLeft").innerHTML = timeLeft;

    //Run timer function every 1 second 
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//Stop the timer to end the game and save score
function endGame() {
    clearInterval(timer);
    var quizContent = `
    <h2>Game over!</h2><br>
    <h3>You score is ` + score +  ` /100!</h3><br>
    <h3>You answered ` + score / 20 +  ` questions correct!</h3><br>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Save your Score</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Store the scores on local storage and display scores from local stoarge
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is: ` + localStorage.getItem("highscore") + `</h2><br>
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;
    //<h1>` + localStorage.getItem("highscore") + `</h1><br>
    document.getElementById("quizBody").innerHTML = quizContent;
}

//Clear the scorer's initials/name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    resetGame();
}

//Reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>JavaScript Quiz!</h1><br>
    <h3>Click to Play!</h3><br>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Deduct 15 seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15; 
    next();
}

//Increase the score by 20 points if the user chooses correct answer
function correct() {
    score += 20;
    next();
}

//Loop through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2><br><br>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}