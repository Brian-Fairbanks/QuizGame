// ========== Global Variables ==========
//========================================

// Constants
const startTime = 60;

// these questions are stored in an array of objects
const questions=[
    {
        question: "The answer is #3",
        choices: ["choose not thou 1","neither choose thou 2","accepting then that thou choose 3","4 is right out"],
        answer: 2 // remember that index start at 0
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyperlinks and Text Markup Language","Hyper Text Markup Language","aHome Tool Markup Language"],
        answer: 1 // remember that index start at 0
    },
    {
        question: "Who is making the Web standards?",
        choices: ["The World Wide Web Consortium", "Microsoft", "Google","Mozilla"],
        answer:
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["<heading>", "<h6>", "<head>", "<h1>"],
        answer: 3
    },
    {
        question: "Choose the correct HTML element to define important text",
        choices: ["<important","<i>","<strong>","<b>"],
        answer:2
    },
    {
        question: "Choose the correct HTML element to define bold text",
        choices: ["<important","<i>","<strong>","<b>"],
        answer:3
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        choices: ["<break>","<lb>","<br>","<\\n"],
        answer:2
    },
    {
        question: "Choose the correct HTML element to define emphasized text",
        choices: ["<em>","<italic>","<emphasize>","<i>"],
        answer:0
    },
    {
        question: "Choose the correct HTML element to define italicized text",
        choices: ["<em>","<italic>","<emphasize>","<i>"],
        answer:3
    },
    {
        question: "What is the correct HTML for adding a background color?" ,
        choices: ["<background>yellow</background>","<body style-\"background-color:yellow;\"","body bg=\"yellow\">"],
        answer:1
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        choices: ["<a name=\"http://www.placeholder.com\">link</a>","<a href=\"http://www.placeholder.com\">link</a>","<a src=\"http://www.placeholder.com\">link</a>","<a url=\"http://www.placeholder.com\">link</a>"],
        answer:1
    },
    {
        question: "Which character is used to indicate an end tag?",
        choices: ["^","<","/","*"],
        answer:
    },
    {
        question: "How can you open a link in a new tab/browser window?",
        choices: ["<a href=\"url\" target=\"_blank\">", "<a href=\"url\" target=\"new\">", "<a href=\"url\" tab=\"new\"","<a href=\"url\" new"],
        answer:0
    },
    {
        question: "Which of these elements are all <table> elements?",
        choices: ["<table><head><tfoot>","<thead><body><tr>","<table><tr><tt>","<table><tr><td>"],
        answer:3
    },
    {
        question: "How can you make a numbered list?",
        choices: ["<ol>","<ul>","<nl>","<#l>"],
        answer:0
    },
    {
        question: "How can you make a bulleted list?",
        choices: ["<ol>","<ul>","<nl>","<bl>"],
        answer:1
    },
    {
        question: "What is the correct HTML for inserting an image?",
        choices: [ "<img src=\"image.gif\" alt=\"MyImage\">", "<image src=\"image.gif\" alt=\"MyImage\">", "<img href=\"image.gif\" alt=\"MyImage\">", "<img alt=\"MyImage\">image.gif</img>"],
        answer:0
    },
]
// Others
var timerFill = document.getElementById("timerFill");
var timerSpan = document.getElementById("timerSpan");
var time=startTime;
var timer;

var introCard = document.getElementById("intro");
var startBtn = document.getElementById("startBtn");

var questionCard = document.getElementById("questions");
var questionSpan = document.getElementById("questionSpan");
var choiceSpan = document.getElementById("choiceSpan");
var answerSpan = document.getElementById("answerSpan");
var curQuestion;
var choiceBtns;

var resultsCard = document.getElementById("results");
var scoreSpan = document.getElementById("scoreSpan");
var retryBtn = document.getElementById("retryBtn");

var score=0;
var wrong=0;

// ========== Functions =================
//========================================
function toggleVisible(thisElem){
    thisElem.classList.toggle("hide")
}

function renderTimer(){
    var timePer = (time/startTime)*100;

    //set timer colors
    if(timePer>40){
        timerFill.style.background="#050";
    }
    else if(timePer>15){
        timerFill.style.background="#550";
    }
    else{
        timerFill.style.background="#500";
    }

    //update timer bar
    timerFill.style.width = timePer+"%";
    timeSpan.textContent = time;
}


function updateTimer(){
    //if the time is out, end the game
    if(time<1){
        time=0;
        renderTimer();  // one last time so the timer isn't stuck at 1
        clearInterval(timer);
        showResults();
        return;
    }

    //update time bar in top left
    renderTimer();

    //decrement the time;
    time--;
}


function showResults(){
    toggleVisible(questionCard);

    var scoreString = ""+score+"/"+(score+wrong)+"\n"+Math.floor((score/(score+wrong))*100)+"%";
    scoreSpan.textContent = scoreString;


    toggleVisible(resultsCard);
}


function toIntro(){
    toggleVisible(resultsCard);
    toggleVisible(introCard);
    // reset timer to default settings
    time = startTime; // starting timer at 60 seconds, plus
    renderTimer();
    //reset score
    score=0;
    wrong=0;
    //reset answer
    answerSpan.textContent="";
    answerSpan.style.color="#000";
    questionCard.classList.remove("correct","wrong");
}


function choiceMade(event){
    questionCard.classList.remove("correct","wrong");

    var choice = event.target.id;
    //Correct Answer
    if(choice == curQuestion.answer){
        score+=1
        answerSpan.textContent="Correct!";
        answerSpan.style.color="#050";
        questionCard.classList.add("correct");
    }
    //Wrong Answer
    else{
        wrong++;
        time-=5;
        answerSpan.textContent="Wrong.";
        answerSpan.style.color="#500";
        questionCard.classList.add("wrong");
    }
    nextQuestion();
}


function nextQuestion(){
    //hide the card
    toggleVisible(questionCard);
    // clear the fields
    choiceSpan.innerHTML="";
    //choose a random question that has not been chosen before
    curQuestion = questions[0];

    // display question
    questionSpan.textContent = curQuestion.question;

    //display the answers in random order, but maintain ids
    var choiceLength = curQuestion.choices.length;
    var choiceUsed = []
    for (var i=0; i< choiceLength; i++){
        //create new div to hold a choice, and set its class
        var choiceDiv = document.createElement("div");

        //get a random number that hasn't been used
        do{
            var curChoice = Math.floor(Math.random()*choiceLength);
        }
        while( choiceUsed.indexOf(curChoice)!=-1);

        //add this to the used answer list
        choiceUsed.push(curChoice)

        // create a button to select the choice, and set its values
        var button = document.createElement("BUTTON");
        button.classList.add("btn","btn-primary","choice");
        button.setAttribute("id",curChoice);
        button.textContent = String.fromCharCode( 65+i );        // assign a letter to the button, A/B/C..

        // create a label to go next to the button
        var span = document.createElement("span");
        span.textContent=curQuestion.choices[curChoice];

        //add the button & label to the choice div
        choiceDiv.appendChild(button);
        choiceDiv.appendChild(span);

        //then add to choiceSpan in html
        choiceSpan.appendChild(choiceDiv);
    }

    //with new buttons, they all need to add event listeners
    choiceBtns = document.querySelectorAll(".choice");
    for (var i = 0; i < choiceBtns.length; i++) {
        choiceBtns[i].addEventListener("click",choiceMade);
    }

    //show the card
    toggleVisible(questionCard);
}


function startGame(){
    toggleVisible(introCard);
    toggleVisible(questionCard);

    timer=setInterval(updateTimer,1000);
    nextQuestion();
}

// ========== Main ======================
//========================================
// set the timer to how it should look at the start of the game
window.addEventListener("load",renderTimer);

startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", toIntro);