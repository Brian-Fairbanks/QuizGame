# 04 Web APIs: Code Quiz
[Hosted on Github](https://brian-fairbanks.github.io/QuizGame/.)

many of the questions used for this project were inspired by, or pulled from [w3schools.com](https://www.w3schools.com/quiztest/result.asp)

The goal of this project is to build a timed code quiz with multiple-choice questions. This app will run in the browser and feature dynamically updated HTML and CSS powered by JavaScript code. It aims to feature a clean and polished user interface, and be responsive( ensuring that it adapts to multiple screen sizes).

## User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Functionality

GIVEN I am taking a code quiz

WHEN I click the start button
  * A timer begins, displayed in the top right of the screen.
    * this timer will change yellow when ~1/3 of the time is remaining, and red when the game is almost over
  * The first question is presented

WHEN I answer a question
  * a new question is generated
    * a random number question is chosen that has not been used already
    * this question, and all of its answers are displayed to the screen
    * a separate question-timer is started, to track how quickly this question was answered, with extra points on the line if answered correctly

WHEN I answer a question incorrectly
  * 5 seconds is subtracted from the clock

WHEN all questions are answered or the timer reaches 0
  * The game will end
  

WHEN the game is over
  * the users score will increase based on the amount of time remaining.
  * The user will be able to select a review
    * The questions they were asked will appear in the order they were asked with a green highlight on the correct answer, and a red highlight on the answer they chose (if they are not the same)
  * The user will be able to enter their initials, and submit their score
    * This score will be stored in local storage, and preserve in the high score system untill:
      someone replaces it with a higher score, or the high score list is cleared

WHEN the highscore button in the top left is clicked
  * The past saved highscores are logged to the screen
  * the user will be be presented with a button to take them back to exactly where they were before clicking high score.
  
 ## Images

The following animation demonstrates the application functionality, as demonstrated in the instructions:
![code quiz](./Assets/04-web-apis-homework-demo.gif)
