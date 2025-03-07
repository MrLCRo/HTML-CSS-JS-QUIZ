let currentQuestionIndex = 0;
let shuffledQuestion;

// Function to shuffle answers while keeping track of the correct one
function shuffleAnswers(question) {
    let shuffled = question.answers.map((answer, index) => ({ answer, index }));
    shuffled.sort(() => Math.random() - 0.5); // Shuffle array

    return {
        question: question.question,
        image: question.image,
        answers: shuffled.map(a => a.answer),
        correct: shuffled.findIndex(a => a.index === question.correct) // New index of correct answer
    };
}

// Function to load a question into the UI
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("Quiz Finished!");
        return;
    }

    const questionContainer = document.querySelector(".question");
    const imageElement = document.querySelector(".image-container img");
    const answerButtons = document.querySelectorAll(".answer");

    // Ensure we have a valid question
    if (!questions[currentQuestionIndex]) {
        console.error("No more questions available.");
        return;
    }

    // Get and shuffle current question
    shuffledQuestion = shuffleAnswers(questions[currentQuestionIndex]);

    // Update UI
    questionContainer.textContent = shuffledQuestion.question;
    imageElement.src = shuffledQuestion.image;
    imageElement.alt = "Question Image";

    // Assign answers to buttons
    answerButtons.forEach((button, index) => {
        button.textContent = shuffledQuestion.answers[index];
        button.onclick = () => checkAnswer(index);
    });
}

// Function to check the answer
function checkAnswer(selectedIndex) {
    if (selectedIndex === shuffledQuestion.correct) {
        alert("Correct! 🎉");
    } else {
        alert("Wrong! ❌");
    }

    // Load the next question
    currentQuestionIndex++;
    loadQuestion();
}

// Load the first question when the page is ready
document.addEventListener("DOMContentLoaded", () => {
    if (typeof questions !== "undefined" && questions.length > 0) {
        loadQuestion();
    } else {
        console.error("Questions array is not defined or empty.");
    }
});
