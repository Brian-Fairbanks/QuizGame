// ========== Global Variables ==========
//========================================

// Constants
const startTime = 60;
// Others
var timerFill = document.getElementById("timerFill");
var timerSpan = document.getElementById("timerSpan");
var time;
var timer;

var introCard = document.getElementById("intro");
var startBtn = document.getElementById("startBtn");

var questionCard = document.getElementById("questions");
var questionSpan = document.getElementById("questionSpan");
var choiceSpan = document.getElementById("choiceSpan");
var answerSpan = document.getElementById("answerSpan");

var resultsCard = document.getElementById("results");
var scoreSpan = document.getElementById("scoreSpan");
var retryBtn = document.getElementById("retryBtn");

// ========== Functions =================
//========================================
function toggleCard(thisCard){
    thisCard.classList.toggle("hide")
}

function showResults(){
    toggleCard(questionCard);
    toggleCard(resultsCard);
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
    console.log(timerFill.style)

    //update timer bar
    timerFill.style.width = timePer+"%";
    timeSpan.textContent = time;
}

function updateTimer(){
    //update time bar in top left
    renderTimer();

    //if the time is out, end the game
    if(time<1){
        clearInterval(timer);
        showResults();
        return;
    }
    //decrement the time;
    time--;
    
}
function toIntro(){
    toggleCard(resultsCard);
    toggleCard(introCard);
}

function startGame(){
    time = startTime; // starting timer at 60 seconds, plus
    toggleCard(introCard);
    toggleCard(questionCard);

    timer=setInterval(updateTimer,1000);
}

function nextQuestion(){

}

// ========== Main ======================
//========================================
startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", toIntro);