
var timeLimit = 60;


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

async function game()
{

console.log("starting quiz");

for(var i = 0; i < questions.length; i++)
{

populateQuiz(questions[i]);

// await button click.

//if answer is correct
if(checkAnswer(questions[i],n))
	{correctAnswer();}
	else
	{
wrongAnswer();
	}
}




}

function populateQuiz(qo)
{

document.getElementById("question").textContent = qo.question;

}

game();


