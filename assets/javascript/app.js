var questionNum = 0,
      right = 0,
      wrong = 0,
      intervalID = 0,
      timerIntervalId = 0,
      timerRunning = false,

      question1obj = {
        question: "What is the color of the sky?",
        a: "Red",
        b: "Blue",
        c: "Violet",
        d: "Brown",
        correct: "B"
      },

      question2obj = {
        question: "Which of the following is a Pokemon?",
        a: "Agumon",
        b: "Squirrel",
        c: "Pikachu",
        d: "Battletoad",
        correct: "C"
      },

      question3obj = {
        question: "Who was the host of Who Want's To Be A Millionaire first?",
        a: "Regis Philbin",
        b: "Homer Simpson",
        c: "The Mad Hatter",
        d: "Meredith Vieira",
        correct: "A"
      },

      questionArray = [question1obj, question2obj, question3obj],
      currentQuestionObj = questionArray[questionNum];

      console.log("First question: " + currentQuestionObj.question);

$(document).ready(function() {
  //Play VictoryMusic
  document.getElementById('bgMusic').play();
  updateHTML();
  startTimer(60);

  //  Click events
	$(".answerCol").on("click", function(){
    console.log("Clicked an answer!");
    clickedAnswer(this);
  });


	$("#newGame").on("click", function(){
    console.log("Clicked New Game!");
    newGame();
  });

});

// Functions
function clickedAnswer(scope){
  var letterClicked = $(scope).attr("letter"),
      letterRowId = "answerRow" + letterClicked;

  if (letterClicked === currentQuestionObj.correct){
    rightAnswer(letterRowId);
  }
  else {
    wrongAnswer(letterRowId);
  }
}

function rightAnswer(letterRowId){
  stopTimer(intervalID,timerIntervalId);
  document.getElementById('bgMusic').pause();
  right++;
  updateHTML();

  //Makes the answer turn green. Then play a sound.
  $("#" + letterRowId).addClass('rightAnswer');
  document.getElementById('rightAnswer').play();

  setTimeout( function(){
    $("#" + letterRowId).removeClass('rightAnswer');
    newQuestion();
  }, 5000);

}

function wrongAnswer(letterRowId){
  stopTimer(intervalID,timerIntervalId);
  document.getElementById('bgMusic').pause();
  wrong++;
  updateHTML();

  //Makes the answer turn red. Then play a sound.
  $("#" + letterRowId).addClass('wrongAnswer');
  document.getElementById('wrongAnswer').play();

  setTimeout( function(){
    $("#" + letterRowId).removeClass('wrongAnswer');
    newQuestion();
  }, 5000);

}

function timedOut(letterRowId){
  stopTimer(intervalID,timerIntervalId);
  wrong++;
  document.getElementById('bgMusic').pause();
  newQuestion();

}

function newQuestion(){
  document.getElementById('bgMusic').play();

  if (questionNum === questionArray.length - 1){
    questionNum = 0;
    console.log("Out of questions, starting over.");
  }
  else {
    questionNum++;
  }

  currentQuestionObj = questionArray[questionNum];

  console.log("New question: " + currentQuestionObj.question);

  updateHTML();

  startTimer(60);
}

function newGame(){
  document.getElementById('bgMusic').play();
  stopTimer(intervalID,timerIntervalId);

  wrong = 0;
  right = 0;

  questionNum = 0;

  currentQuestionObj = questionArray[questionNum];

  updateHTML();

  startTimer(60);

}

function stopTimer(intervalID,timerIntervalId){
  clearTimeout(intervalID);
  clearInterval(timerIntervalId);
  timerRunning = false;
}

function startTimer(seconds){
  var ms = seconds * 1000;

  if (!timerRunning) {
        timerIntervalId = setInterval(function(){
          seconds--;
          // console.log("Seconds left: " + seconds);
          updateTime(seconds);
        }, 1000);

        timerRunning = true;
      }

  intervalID = setTimeout(function(){
    timedOut();
  },ms);

}

function updateTime(secondsLeft){
  $("#timer").text(secondsLeft + " Seconds Left");
}

function updateHTML(){
  $("#question").text(currentQuestionObj.question);
  $("#answerA").text(currentQuestionObj.a);
  $("#answerB").text(currentQuestionObj.b);
  $("#answerC").text(currentQuestionObj.c);
  $("#answerD").text(currentQuestionObj.d);

  $("#wrongAnswers").text(wrong);
  $("#rightAnswers").text(right);

  $("#timer").text("60 Seconds Left");
}

