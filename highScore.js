// ========== Global Variables ==========
//========================================

var highScores;
// score exists in preceding scripts.js
var userInput = document.getElementById("initialsInput");

var maxScores = 10;

// ========== Functions =================
//========================================

function clearhighScores(){
    highScores=[];
    localStorage.removeItem("highScoreList");
}


function displayHighScores(){
    var dscores=document.createElement("div");
    dscores.classList.add("row");
    for (var i=0; i<highScores.length; i++){
        var duser=document.createElement("div");
        var dscore=document.createElement("div");

        duser.textContent=highScores[i].user;
        duser.classList.add("col-6");

        dscore.textContent=highScores[i].score;
        dscore.classList.add("col-6");

        dscores.appendChild(duser);
        dscores.appendChild(dscore);
    }
    highScoreInsert.appendChild(dscores);

    var bestScore = highScores[0].score;
    if (bestScore==undefined){bestScore = 0;}
    highestScore.textContent=bestScore;
}

// load the highscore list from localstorage, or create a new one
function loadHighScores(){
    highScores = JSON.parse( localStorage.getItem("highScoreList") );

    // if null, genearte a new object
    if (highScores == null){
        highScores = []
    }

    displayHighScores()
}

// compare required for sorting a list of objects
function compare(a, b) {
    const scoreA = a.score;
    const scoreB = b.score;
  
    var comparison = 0;
    if (scoreA < scoreB) {
      comparison = 1;
    } else if (scoreA > scoreB) {
      comparison = -1;
    }
    return comparison;
  }

function showScores(){
    if( curCard!= highScoreCard){
        changeCard(highScoreCard)
        displayHighScores();
    }
}
function submitHighScore(){
    // stop the submit process
    event.preventDefault()

    // generate an object containing user and score
    var thisScore ={
        user:userInput.value,
        score:score
    }

    //push this object to the high score list
    highScores.push(thisScore);

    //sort the high scores
    highScores.sort(compare)

    //limit to top variable
    while(highScores.length > maxScores){
        highScores.pop();
    }

    //overwrite the local storage for highscore
    localStorage.setItem( "highScoreList", JSON.stringify(highScores) );
}


// ========== Main ======================
//========================================

highScoresBtn.addEventListener("click",showScores);
window.addEventListener("load", loadHighScores);
submitScore.addEventListener("submit", (event)=>{
    event.preventDefault();
    submitHighScore();   
});
