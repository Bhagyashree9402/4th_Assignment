// all button ids are declared
var startQuiz = document.querySelector("#startQuiz");
var answers = document.getElementsByClassName("answers");
var question = document.querySelector("#question");
var wrongAnswer = document.querySelector("#wrongAnswer");
var finalScore = document.querySelector("#finalScore");
var initial = document.querySelector("#initial");
var btnSubmit = document.querySelector("#btnSubmit");
var done = document.querySelector("#done");
var highScore = document.querySelector("#highScore");
var goBack = document.querySelector("#goBack");
var clearHs = document.querySelector("#clearHs");
var viewHs = document.querySelector("#viewHs");
var viewHsClicked = false;
var clearHsClicked = false;


var correctAnswers = 0;
var timeEl = document.querySelector(".time");
var mainEl = document.querySelector("#main");
var secondsLeft = 60;

//function for timer
function setTime() {
    var timeInterval = setInterval(function () {
        if (secondsLeft > 0) {
            secondsLeft--;
        } else {
            secondsLeft = 0;
        }
        timeEl.textContent = ("Time:" + secondsLeft);
        if (secondsLeft <= 0) {
            clearInterval(timeInterval);
            if (!viewHsClicked) {
                currentCounter = questions.length - 1;
                exitCondition();
            }
        }

    }, 500);
}

let currentCounter = 0;

//questions and answers are declared in the array
let questions = [
    {
        question: "What does DOM stands for ?",
        choice_A: "Document Object Model",
        choice_B: "Dominent Object Model",
        choice_C: "Document Object MarkUp",
        choice_D: "Diameter Object Model",
        answer: "choice_A"
    },

    {
        question: "What does JS stands for ?",
        choice_A: "Java Split",
        choice_B: "Jquery Script",
        choice_C: "Java Source",
        choice_D: "Java Script",
        answer: "choice_D"
    },

    {
        question: "Which of the following is not a reserved word in JavaScript?",
        choice_A: "interface",
        choice_B: "program",
        choice_C: "throws",
        choice_D: "short",
        answer: "choice_B"
    },

    {
        question: "What does JSON stands for ?",
        choice_A: "Java Split Object Notion",
        choice_B: "jquery Script Object Notation",
        choice_C: "Java Script Object Notation",
        choice_D: "Java Splice Object Notion",
        answer: "choice_C"
    },

    {
        question: "What does HTML stands for ?",
        choice_A: "Hypertext Markup Language",
        choice_B: "Hypertest Markup Language",
        choice_C: "Hypertext Manual Language",
        choice_D: "Hipertext Markup Language",
        answer: "choice_A"
    },

    {
        question: "Which special character is used for class element?",
        choice_A: ".",
        choice_B: "#",
        choice_C: "@",
        choice_D: "/",
        answer: "choice_A"
    },
];


function startQuiz1() {
    console.log("startquiz is " + startQuiz.textContent);
    console.log("questions  is " + questions[currentCounter].question);
    document.getElementById('startPage').style.display = "none";
    startQuiz.style.display = "none";
    enabledisableQA(true);
    viewHsClicked = false;

    setTime();
    question.innerHTML = questions[currentCounter].question;
    for (var i = 0; i < answers.length; i++) {
        console.log("answer id is " + answers[i].id);
        answers[i].innerHTML = questions[currentCounter][answers[i].id];
    }

}

function answers1(e) {
    e.preventDefault();
    console.log("answers is " + this.textContent);
    console.log("answer id is " + this.id);
    if (questions[currentCounter].answer == this.id) {
        correctAnswers++;
        wrongAnswer.innerHTML = "correct answer";
    }
    else {
        secondsLeft = secondsLeft - 10;


        wrongAnswer.innerHTML = "wrong answer";
        if (secondsLeft < 0) {
            currentCounter = questions.length - 1;
        }
    }



    if (currentCounter == (questions.length - 1)) {
        exitCondition();

    } else {
        currentCounter = currentCounter + 1;
        question.innerHTML = questions[currentCounter].question;
        for (var i = 0; i < answers.length; i++) {
            answers[i].innerHTML = questions[currentCounter][answers[i].id];
        }
    }
}

function exitCondition() {
    secondsLeft = 0;
    enabledisbleScore(true);
    wrongAnswer.style.display = "none";
    startQuiz.style.display = "none";
    enabledisableQA(false);
    finalScore.innerHTML = "Your final score is " + correctAnswers;
}

function enabledisbleScore(value) {
    if (value) {
        document.getElementById('finalScore').style.display = "block";
        document.getElementById('initial').style.display = "block";
        document.getElementById('btnSubmit').style.display = "block";
        document.getElementById('done').style.display = "block";
    }
    else {
        document.getElementById('finalScore').style.display = "none";
        document.getElementById('initial').style.display = "none";
        document.getElementById('btnSubmit').style.display = "none";
        document.getElementById('done').style.display = "none";
    }
}

function enabledisableQA(value) {
    if (value) {

        document.getElementById('question').style.display = "block";
        document.getElementById('choice_A').style.display = "block";
        document.getElementById('choice_B').style.display = "block";
        document.getElementById('choice_C').style.display = "block";
        document.getElementById('choice_D').style.display = "block";
    } else {

        document.getElementById('question').style.display = "none";
        document.getElementById('choice_A').style.display = "none";
        document.getElementById('choice_B').style.display = "none";
        document.getElementById('choice_C').style.display = "none";
        document.getElementById('choice_D').style.display = "none";
    }
}

function enabledisableHighscore(value) {
    if (value) {
        document.getElementById('highScore').style.display = "block";
        document.getElementById('goBack').style.display = "block";
        document.getElementById('clearHs').style.display = "block";
    }
    else {
        document.getElementById('highScore').style.display = "none";
        document.getElementById('goBack').style.display = "none";
        document.getElementById('clearHs').style.display = "none";
    }
}


enabledisableQA(false);
enabledisbleScore(false);
enabledisableHighscore(false);

startQuiz.addEventListener("click", startQuiz1);

for (var i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", answers1);
}


var userText = "";

btnSubmit.addEventListener("click", function (e) {
    e.preventDefault()
    showHighscore();

})

function showHighscore() {
    wrongAnswer.style.display = "none";
    startQuiz.style.display = "none";
    enabledisableQA(false);
    document.getElementById('startPage').style.display = "none";
    userText = initial.value;

    if (!clearHsClicked) {
        if (window.localStorage.getItem(window.localStorage.key(0)) == null || correctAnswers > window.localStorage.getItem(window.localStorage.key(0))) {
            window.localStorage.clear();

            window.localStorage.setItem(initial.value, correctAnswers);

        }
        highScore.innerHTML = "High Score is " + window.localStorage.getItem(window.localStorage.key(0));
    } else {
        highScore.innerHTML = "High Score is " + window.localStorage.length;
    }

    enabledisbleScore(false);
    enabledisableHighscore(true);
}

clearHs.addEventListener("click", function (e) {
    e.preventDefault()
    clearHsClicked = true;
    console.log("Inside clear high score");
    window.localStorage.clear();
    showHighscore();
})

goBack.addEventListener("click", function (e) {
    e.preventDefault()
    clearHsClicked = false;
    document.getElementById('startPage').style.display = "block";
    startQuiz.style.display = "block";
    enabledisableQA(false);
    enabledisbleScore(false);
    enabledisableHighscore(false);
    wrongAnswer.style.display = "block";
    wrongAnswer.innerHTML = "";
    secondsLeft = 60;
    correctAnswers = 0;
    currentCounter = 0;
})

viewHs.addEventListener("click", function (e) {
    e.preventDefault()
    secondsLeft = 0;
    viewHsClicked = true;
    showHighscore();
})