// ========== Global Variables ==========
//========================================

// Constants
const startTime = 60;

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
var questionsAsked=[];
var answersGiven=[];

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
    questionsAsked=[];
    answersGiven=[];
    //reset answer
    answerSpan.textContent="";
    answerSpan.style.color="#000";
    questionCard.classList.remove("correct","wrong");
}


function choiceMade(event){
    questionCard.classList.remove("correct","wrong");

    var choice = event.target.id;
    // add to answers give
    answersGiven.push(choice);
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


// returns a div containing an array of divs with all the answers
function displayChoices(){
    //display the answers in random order, but maintain ids
    var choiceLength = curQuestion.choices.length;
    var choiceUsed = []

    //create a new div to contain all of the choices
    var allChoiceDiv = document.createElement("div");

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
        allChoiceDiv.appendChild(choiceDiv);
    }
    return allChoiceDiv;
}

function nextQuestion(){
    //hide the card
    toggleVisible(questionCard);
    // clear the fields
    choiceSpan.innerHTML="";

    //choose a random question that has not been chosen before
    do{
        var nextQuest = Math.floor(Math.random()*questions.length);
    }
    while( questionsAsked.indexOf(nextQuest)!=-1);
    questionsAsked.push(nextQuest);
    curQuestion = questions[nextQuest];

    // display question
    questionSpan.textContent = curQuestion.question;

    choiceSpan.appendChild( displayChoices() );

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