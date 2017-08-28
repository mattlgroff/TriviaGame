var questionNum = 0,
      right = 0,
      wrong = 0,
      intervalID = 0,
      timerIntervalId = 0,
      timerRunning = false,
      defaultTime = 30,

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

      question4obj = {
        question: "Who was the principal developer of the Linux kernel?",
        a: "Steve Jobs",
        b: "Linus Tech Tips",
        c: "Linus Torvalds",
        d: "Brandon Lyon",
        correct: "C"
      },

      question5obj = {
        question: "Which insect shorted out an early supercomputer and inspired the term 'computer bug'?",
        a: "Roach",
        b: "Fly",
        c: "Japanese Beetle",
        d: "Moth",
        correct: "D"
      },

      question6obj = {
        question: "According to the Population Reference Bureau, what is the approximate number of people who have ever lived on earth?",
        a: "9,001",
        b: "1,337",
        c: "100,000,000,000",
        d: "5",
        correct: "C"
      },

      question7obj = {
        question: "Which word has more than 4 letters?",
        a: "cats",
        b: "dog",
        c: "sky",
        d: "pie",
        correct: "A"
      },

      questionArray = [question1obj, question2obj, question3obj, question4obj, question5obj, question6obj, question7obj],
      currentQuestionObj = questionArray[questionNum];

      console.log("First question: " + currentQuestionObj.question);

$(document).ready(function() {
  document.getElementById('bgMusic').play();
  updateHTML();
  startTimer(defaultTime);

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

  startTimer(defaultTime);
}

function newGame(){
  document.getElementById('bgMusic').play();
  stopTimer(intervalID,timerIntervalId);

  wrong = 0;
  right = 0;

  questionNum = 0;

  currentQuestionObj = questionArray[questionNum];

  updateHTML();

  startTimer(defaultTime);

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

  $("#timer").text(defaultTime + " Seconds Left");
}

