// ========== Global Variables ==========
//========================================

var highScores;
var maxScores = 10;

// ========== Functions =================
//========================================

function ClearhighScores(){
    highScores=[];
    localStorage.removeItem("highScoreList");

    displayHighScores();
}


function displayHighScores(){
    //clear before adding to the list
    highScoreInsert.innerHTML="";

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

    var bestScore;
    console.log(highScores);
    if (highScores.length==0){bestScore = 0;}
    else{bestScore = highScores[0].score;}
    
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
    displayHighScores()
    submitScoreDiv.classList.toggle("hide");
    scoreSubmittedDiv.classList.toggle("hide");
}


// ========== Main ======================
//========================================


window.addEventListener("load", loadHighScores);

highScoresBtn.addEventListener("click",showScores);

submitScore.addEventListener("submit", (event)=>{
    event.preventDefault();
    submitHighScore();   
});

clearhighScores.addEventListener("click", (event)=>{
    event.preventDefault();
    ClearhighScores();   
});