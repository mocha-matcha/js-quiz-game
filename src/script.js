
var timeLimit = 60;
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

function QuizObject(question,answers,correctAnswer,answerResponses)
{

this.question = question;
this.answers = answers;
this.correctAnswer = correctAnswer;
this.answerResponses = answerResponses;


}


var firstQuestion = new QuizObject("Who is the coolest.",
["me","me","you","we"],0,["yes","no","no","no"]
);


var secondQuestion = new QuizObject("Who is the coolest.",
["me","me","you","we"],0,["yes","no","no","no"]
);


var thirdQuestion = new QuizObject("Who is the coolest.",
["me","me","you","we"],0,["yes","no","no","no"]
);

var questions = [firstQuestion,secondQuestion,thirdQuestion];

var seenQuestions = []

function getNextQuestion()
{
let num = 0;


while(seenQuestions.includes(num))
	{

num = getRandomNumber(0,questions.length -1);
	}

seenQuestions.push(num);
return num;

}

function getRandomNumber(min,max)
{
return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateTimeLimit()
{
document.querySelector('h1').textContent = timeLimit;

}

function game()
{
document.getElementById("start-button").remove();
console.log("starting quiz");
populateQuiz(getNextQuestion());

var gameLoop = setInterval(function()
	{
timeLimit--;
updateTimeLimit();
//populate ui with question and yeild until answer is pressed.
		if(timeLimit <= 0)
		{
			clearInterval(gameLoop);
			endGame();
		}
	}
	,1000);

}

function endGame()
{
console.log("game over")
document.querySelector('h1').textContent = "DONE!";
}

function createAnswerElement(qo,index)
{
var answerElement = document.createElement("li");
answerElement.textContent = alphabet.charAt(index).toUpperCase() + ": " + qo.answers[index];


return answerElement;


}

function createAnswerButtonElement(qo,index)
{

var answerElement = document.createElement("li");
var button = document.createElement("button");
button.appendChild(document.createTextNode(qo.answers[index]));
button.addEventListener("click",function(){ checkAnswer(qo,index)});
answerElement.appendChild(button);
return answerElement;
}

function populateQuiz(qo)
{

document.getElementById("question").textContent = qo.question;

for(var i = 0; i < qo.answers.length; i++)
{

document.getElementById("answers").appendChild(createAnswerElement(qo,i));
document.getElementById("answer-buttons").appendChild(createAnswerButtonElement(qo,i));

}


}

function checkAnswer(qo,selectedAnswer)
{
console.log("checking");
if(qo.correctAnswer == selectedAnswer)

{
	correctAnswer();
return true;
}
wrongAnswer();
return false;

}
function correctAnswer()
{
console.log("correct");

}
function wrongAnswer()
{

console.log("Wrong");

}


document.querySelector('#start-button').addEventListener('click',game);


