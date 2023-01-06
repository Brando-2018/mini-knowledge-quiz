
// items to target 
const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice"))
const scoreText = document.querySelector("#score")

const startButton = document.querySelector("#start-button")
const timer = document.querySelector("#timer")
const initialsForm = document.querySelector("#initials-form")

let currentQuestionIdx = 0
let receivingAnswers = true
let score = 0 

let timeLeft = 60 // in seconds
let intervalId

let questions = [
    {
        question: "Where is the correct place to insert a JavaScript link?",
        choices: ["In a external file", "At the top of the HTML", "Pinned to your task bar", "With the CSS"],
        correct: "In a external file"
    },
    {
        question: "Variables are declared by which keyword?",
        choices: ["const", "var", "let", "all of the above"],
        correct: "all of the above"
    },
    {
        question: "What is the syntax to call out a function?",
        choices: ["let function", "function", "function ()", "fiction()"],
        correct: "function ()"
    },
    {
        question: "What would you use getItem for?",
        choices: ["variable naming", "to call out a string", "local storage", "media Queries"],
        correct: "local storage"
    }
]

startButton.addEventListener("click", startQuiz)
initialsForm.addEventListener("submit", saveScore)

function startQuiz() {
    startButton.style.display = "none"
    displayedQuestion(currentQuestionIdx)
    intervalId = setInterval(updateTimer, 1000)
}

function updateTimer() {
    timeLeft--
    timer.textContent = `Time left: ${timeLeft}s`
    if (timeLeft === 0 || !receivingAnswers) {
        clearInterval(intervalId)
        timer.textContent = "Time's up!"
    }}
// displays the question 
function displayedQuestion(qIdx) {
    const currentQuestion = questions[qIdx] 
    question.textContent = currentQuestion.question
    
    for (let i = 0; i < choices.length; i++) {
        choices[i].textContent = currentQuestion.choices[i]
    }
        
//displays the next question and checks users answers and updates score 

    for (let i = 0; i < choices.length; i++) {
        choices[i].addEventListener("click", selectAnswer)
    }
}
    function selectAnswer(event) {
        const selectedChoice = event.target
        const correct = selectedChoice.textContent === questions[currentQuestionIdx].correct
        if (correct) {
            score += 100 / questions.length
        } else {
            timeLeft -= 15
        }
        scoreText.textContent = `Score: ${score}%`
        receivingAnswers = false
        currentQuestionIdx++
        if (currentQuestionIdx === questions.length) {
            timer.textContent = "Quiz completed!"
            initialsForm.style.display = "block"
        } else {
            displayedQuestion(currentQuestionIdx)
            receivingAnswers = true
        }
    }
