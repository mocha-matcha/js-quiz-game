
var timeLimit = 10;
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var timerElement = document.querySelector("#timer");
var questionBox = document.querySelector("#question-box");
var questionText = document.querySelector('#question-text');
var answerBox =  document.querySelector("#answer-box");
var answerList =  document.querySelector("#answer-list");
var startButton = document.querySelector('#start-button');
var scoreElement = document.querySelector('#score');
var controlButtonsElement = document.querySelector('#play-buttons');
var timeLeft = 10;

var currentScore = 0;


function GameInformation(score,name)
{
this.score = score;
this.name = name;
}

var gameInformation = [];
function Question(question,answers,correctAnswer) 
	{
		this.question = question;
		this.answers = answers;
		this.correctAnswer = correctAnswer;
	}


var defaultQuestion = new Question("what is javascript?",["A scripting language","A programming language","A coffee recipe."],0);


var questions = [defaultQuestion,new Question("What isnt a primitive",["boolean","object","number","string"],1),new Question("Javascript runs in...",["the browser","a server","both!"],2)]


var currentQuestion = questions[0];
function getRandomNumber(max,min)
{
return Math.floor(Math.random() * (max - min)) + min;

}

function updateTimerElement()
{
timerElement.textContent = timeLeft;
}

function getNextQuestion()
{
console.log(questions);
return questions[getRandomNumber(0,questions.length -1)];
}

function clearPopulationUi()
{
questionText.textContent = "";
    while (answerList.firstChild) {
        answerList.removeChild(answerList.firstChild);
    }
}

function populateQuestionUi(givenQuestion)
{
clearPopulationUi();
	currentQuestion = givenQuestion;
	questionText.textContent = givenQuestion.question;
	for(let i = 0; i < givenQuestion.answers.length; i++)

	{
		answerList.appendChild(createAnswerButton(i))
	}



}

function createAnswerButton(index)
{
var element = document.createElement('button');
element.setAttribute('id',"answer-button");
element.textContent = currentQuestion.answers[index];
element.setAttribute('index',index);
	element.getAttribute('index');
element.addEventListener('click',checkAnswer);
return element;
}


function correctAnswer()
{
console.log("correct");
	currentScore+=10;
}

function wrongAnswer()
{
console.log("wrong");
currentScore -=5;
}

function updateScore()
{
scoreElement.textContent = "Score: " + currentScore;
}

function checkAnswer(event)
{
console.log(currentQuestion.correctAnswer);
console.log(event.target.getAttribute('index'));

if(currentQuestion.correctAnswer == event.target.getAttribute('index'))
	{
correctAnswer();
	}
	else
	{

		wrongAnswer();

	}
updateScore();
populateQuestionUi(getNextQuestion());

}

function game()
{
if(localStorage.getItem != null)
	{gameInformation = JSON.parse(localStorage.getItem('gameInformation'))}

    while (controlButtonsElement.firstChild) {
        controlButtonsElement.removeChild(controlButtonsElement.firstChild);
    }

timeLeft = timeLimit;
	updateTimerElement();
	currentScore = 0;
populateQuestionUi(getNextQuestion());

var gameInterval = setInterval(function(){
timeLeft--;
updateTimerElement();
updateScore();
if(timeLeft <= 0)
	{
clearInterval(gameInterval);
		endGame();
	}
},1000);
}


function endGame()
{
var name = prompt("Whats your name:");
var currentGame = new GameInformation(currentScore,name);
gameInformation.push(currentGame)

var restartButton = document.createElement('button');
restartButton.textContent = "Click to restart!";
restartButton.addEventListener('click',game);
controlButtonsElement.appendChild(restartButton);
console.log(gameInformation);
localStorage.setItem("gameInformation",JSON.stringify(gameInformation));
}


startButton.addEventListener('click',game);
