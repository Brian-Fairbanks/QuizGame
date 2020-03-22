// ========== Global Variables ==========
//========================================

// Constants
const startTime = 90;
const questionStartPoints = 50;

// Error card - should only ever be visable if JS is not enabled/loaded
var errorCard = document.getElementById("error");

// Timer inputs and settigns
var timerFill = document.getElementById("timerFill");
var timerSpan = document.getElementById("timerSpan");
var time=startTime;
var timer;

// Intro Card and inputs
var introCard = document.getElementById("intro");
var startBtn = document.getElementById("startBtn");

// Question Card and inputs
var questionCard = document.getElementById("questions");
var questionSpan = document.getElementById("questionSpan");
var choiceSpan = document.getElementById("choiceSpan");
var answerSpan = document.getElementById("answerSpan");
var extraPointsSpan = document.getElementById("extraPointsSpan");
var curQuestion;
var choiceBtns;

// Results Card and inputs
var resultsCard = document.getElementById("results");
var correctSpan = document.getElementById("correctSpan");
var totalSpan = document.getElementById("totalSpan");
var percentSpan = document.getElementById("percentSpan");
var scoreSpan = document.getElementById("scoreSpan");
var timeLeftSpan = document.getElementById("timeLeftSpan");
var timePointsSpan = document.getElementById("timePointsSpan");
var retryBtn = document.getElementById("retryBtn");
var reviewBtn =  document.getElementById("reviewBtn");

// review card and inputs
var reviewCard = document.getElementById("review");
var reviewDiv = document.getElementById("reviewDiv")
var toResultsBtn = document.getElementById("toResultsBtn")

// High Score Card and its Associated inputs
var highScoreCard = document.getElementById("highScores");
var highScoresBtn = document.getElementById("highScoresBtn");
var highScoreInsert = document.getElementById("highScoreInsert");
var highestScore = document.getElementById("highestScore");
var userInput = document.getElementById("initialsInput");
var submitScore = document.getElementById("submitScore");
var clearhighScores = document.getElementById("clearhighScores");

var submitScoreDiv = document.getElementById("submitScore");
var scoreSubmittedDiv = document.getElementById("scoreSubmitted");


var returnBtns = document.getElementsByClassName("resultRtrn");


// card navigation variables
var allCards=[errorCard, introCard, questionCard, resultsCard, reviewCard, highScoreCard];
var lastCard;
var curCard = errorCard; // this will always be where the cards start on a new refresh

// game specific variables.  these get reset each time the game starts.
var score=0;
var right=0;
var wrong=0;
var questionsAsked=[];
var answersGiven=[];

//question timer
var questionTimer;
var extraPoints;
var extraPointBar = document.getElementById("extraPointBar");


// ========== Functions =================
//========================================
function changeCard(thisElem){
    lastCard = curCard;
    curCard = thisElem;
    
    lastCard.classList.add("hide")
    thisElem.classList.remove("hide");
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
        endGame();
        return;
    }

    //update time bar in top left
    renderTimer();

    //decrement the time;
    time--;
}

function updateQuestionTimer(){
    if(extraPoints<1){
        extraPoints=0;
        clearInterval(questionTimer);
        return
    }
    extraPoints-=1;
    //extraPointsSpan.textContent=extraPoints;

    var timePer = (extraPoints/questionStartPoints)*100;
    extraPointBar.style.width = timePer+"%";
}

function showResults(){
    //set up values for results
    // var scoreString = ""+right+"/"+(right+wrong)+"\n"+Math.floor((right/(right+wrong))*100)+"%";
    // scoreSpan.textContent = scoreString;
    
    score+=(time*10);

    var total = right+wrong;
    var percent = (100*(right/total)).toFixed(2);

    timeLeftSpan.textContent=time;
    timePointsSpan.textContent=time*10;

    correctSpan.textContent=right;
    totalSpan.textContent=total;
    percentSpan.textContent=percent;

    scoreSpan.textContent = score;

    // change to resultsCard
    changeCard(resultsCard);
}


function showReview(){
    // clear prev
    reviewDiv.innerHTML="";
    //print every question asked
    var reviewAllDiv = document.createElement("div");

    for(var i=0; i<questionsAsked.length -1; i++){      //-1, since the last question to render wasnt answered
        var curAnsDiv = document.createElement("div");
        curAnsDiv.classList.add("card", "my-2");

        curQuestion = questions[questionsAsked[i]];

        var ansHeader = document.createElement("H5");
        ansHeader.textContent = curQuestion.question;
        curAnsDiv.appendChild( ansHeader )

        //append all answers, by passing highlighting in the forReview object
        
        curAnsDiv.appendChild( displayChoices( {is:true, answer:curQuestion.answer, choice: parseInt(answersGiven[i]) } ) );

        reviewAllDiv.appendChild(curAnsDiv);
        
    }
    reviewDiv.appendChild(reviewAllDiv);
    //change to reviewCard
    changeCard(reviewCard);
}


function showIntro(){
    changeCard(introCard);

    // reset timer to default settings
    time = startTime; // reset timer to max time
    renderTimer();

    //reset score and answered lists
    var score=0;
    right=0;
    wrong=0;
    questionsAsked=[];
    answersGiven=[];

    //reset answer text
    answerSpan.textContent="";
    answerSpan.style.color="#000";
    questionCard.classList.remove("correct","wrong");

    //reset Submit Process
    submitScoreDiv.classList.toggle("hide");
    scoreSubmittedDiv.classList.toggle("hide");
}


function choiceMade(event){
    //stop questionTimer
    clearInterval(questionTimer);

    //clear the right/wrong from the previous question, so it can be reset
    questionCard.classList.remove("correct","wrong");

    //get id of the users choice, and add it to their given answers
    var choice = event.target.id;
    answersGiven.push(choice);

    //Check Answer
    if(choice == curQuestion.answer){
        right+=1
        score+=50+extraPoints; // base correct answer + timer per question, so that each correct answer can give bonus points if answered quickly
        answerSpan.textContent="Correct!";
        answerSpan.style.color="#050";
        questionCard.classList.add("correct");
    }
    //Wrong Answer
    else{
        wrong++;
        time-=5;
        renderTimer();  // update the new time IMMEDIATELY
        answerSpan.textContent="Wrong.";
        answerSpan.style.color="#500";
        questionCard.classList.add("wrong");
    }
    //generate a new question
    nextQuestion();
}


// Takes an object for if for review or not
// this boolean defaults to {false} and irrelevent values if not passed
// returns a div containing an array of divs with all the answers
// or optionally highlighted selections if forReview
function displayChoices(forReview = {is:false, answer:-1, choice:-1}){
    //display the answers in random order, but maintain ids
    var choiceLength = curQuestion.choices.length;
    var choiceUsed = []

    //create a new div to contain all of the choices
    var allChoiceDiv = document.createElement("div");

    // generate each answer, and append it to the div
    for (var i=0; i< choiceLength; i++){
        //create new div to hold a single choice, and set its class
        var choiceDiv = document.createElement("div");

        //get a random number that hasn't been used
        do{
            var curChoice = Math.floor(Math.random()*choiceLength);
        }
        while( choiceUsed.indexOf(curChoice)!=-1);

        //add this to the used answer list
        choiceUsed.push(curChoice)

        // if not generating for review purposes, append a button to select this answer
        if(!forReview.is){
            // create a button to select the choice, and set its values
            var button = document.createElement("BUTTON");
            button.classList.add("btn","btn-primary","choice");
            button.setAttribute("id",curChoice);
            button.textContent = String.fromCharCode( 65+i );        // assign a letter to the button, A/B/C..

            //add the button to the choice div
            choiceDiv.appendChild(button);
        }

        // create a label showing the answer choice
        var span = document.createElement("span");
        span.textContent=curQuestion.choices[curChoice];

        // add highlighting only if for review
        if(forReview.is){
            if(curChoice==forReview.answer){
                span.classList.add("correctAns");
            }
            if(curChoice==forReview.choice && forReview.choice!=forReview.answer){
                span.classList.add("wrongChoice");
            }
        }

        //add the label to the choice div
        choiceDiv.appendChild(span);

        //then add the choice div to choiceSpan in html
        allChoiceDiv.appendChild(choiceDiv);
    }

    // return the fully formed html div
    return allChoiceDiv;
}


function nextQuestion(){
    // clear the fields
    choiceSpan.innerHTML="";

    // if out of questions, end the game
    if(questionsAsked.length == questions.length){
        endGame();
        return;
    }

    //choose a random question that has not been chosen before
    do{
        var nextQuest = Math.floor(Math.random()*questions.length);
    }
    while( questionsAsked.indexOf(nextQuest)!=-1);
    questionsAsked.push(nextQuest);
    curQuestion = questions[nextQuest];

    // add question to DOM
    questionSpan.textContent = curQuestion.question;

    // add choices, a complex series of divs and butttons, to the DOM
    choiceSpan.appendChild( displayChoices() );

    //with new buttons, they all need to add event listeners
    choiceBtns = document.querySelectorAll(".choice");
    for (var i = 0; i < choiceBtns.length; i++) {
        choiceBtns[i].addEventListener("click",choiceMade);
    }

    extraPoints = questionStartPoints;
    questionTimer = setInterval(updateQuestionTimer,100);
}


function endGame(){
    renderTimer();  // one last time so the timer isn't stuck at 1
    clearInterval(timer);
    showResults();
}


function startGame(){
    timer=setInterval(updateTimer,1000);
    nextQuestion();
    changeCard(questionCard);
}


// ========== Main ======================
//========================================

// set the timer to how it should look at the start of the game
window.addEventListener("load",renderTimer);
window.addEventListener("load",changeCard(introCard));

// set up constant buttons
startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", showIntro);
reviewBtn.addEventListener("click", showReview);
toResultsBtn.addEventListener("click", showResults);

// set up class buttons
for (var i=0; i<returnBtns.length; i++){
    returnBtns[i].addEventListener("click", ()=>{ changeCard(lastCard); });
}