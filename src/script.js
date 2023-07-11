
var timeLimit = 60;
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var timerElement = document.querySelector("#timer");
var questionBox = document.querySelector("#question-box");
var questionText = document.querySelector('#question-text');
var answerBox =  document.querySelector("#answer-box");
var answerList =  document.querySelector("#answer-list");
var startButton = document.querySelector('#start-button');
var scoreElement = document.querySelector('#score');
var controlButtonsElement = document.querySelector('#play-buttons');
var timeLeft = 60;
var informationButton = document.getElementById('information-button');
var informationSection = document.getElementById('information-section');
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


var defaultQuestion = new Question("What is javascript?",["A scripting language","A programming language","A coffee recipe."],0);


var questions = [defaultQuestion,new Question("What isn't a primitive...",["Boolean","Object","Number","String"],1),new Question("Javascript runs in...",["The Browser","A Server","Both!"],2)]


var currentQuestion = questions[0];
function getRandomNumber(max,min)
{
  return Math.floor(Math.random() * (max - min) + min);
}

function updateTimerElement()
{
timerElement.textContent = "Time: " + timeLeft;
}

function getNextQuestion()
{
console.log(questions);
return questions[getRandomNumber(0,questions.length)];
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
    while (controlButtonsElement.firstChild) {
        controlButtonsElement.removeChild(controlButtonsElement.firstChild);
    }


	currentScore = 0;
populateQuestionUi(getNextQuestion());
timeLeft = timeLimit;
	updateTimerElement();
var gameInterval = setInterval(function(){
timeLeft--;
updateTimerElement();
updateScore();
if(timeLeft === 0)
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

function populateInformationUi()
{
	var informationInformation = document.getElementById('information-information');
while(informationInformation.firstChild)
	{
		informationInformation.removeChild(informationInformation.firstChild)
	}


for(let i = 0; i < gameInformation.length; i++)
	{
	informationInformation.appendChild(getInformationElement(gameInformation[i]));
	}

}

function getInformationElement(gameInfo)
{
var element = document.createElement('div');
element.setAttribute('class','information');

var nameHeader = document.createElement('h3');
nameHeader.textContent = "Name: " + gameInfo['name'];

var scoreHeader = document.createElement('h3');
scoreHeader.textContent = "Score: "+ gameInfo['score'];

element.appendChild(nameHeader);
element.appendChild(scoreHeader)

return element;

}

function toggleInformation()
{

populateInformationUi();

if (informationSection.style.display === "none")
	{
	informationSection.style.display = "block";
	}
else
	{
	informationSection.style.display = "none";
	}
}

informationButton.addEventListener('click',toggleInformation)
startButton.addEventListener('click',game);

if(localStorage.getItem != null)
	{gameInformation = JSON.parse(localStorage.getItem('gameInformation'))}


