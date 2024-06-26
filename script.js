const questions = [
    {
        question: "ป๊อปคอร์น ป๊อปเพราะอะไร ?",
        image: "popcorn.jpg",
        answers: [
            {text: "ไอน้ำในเมล็ดข้าวโพดขยายตัว", correct : true},
            {text: "เนื้อแป้งในเมล็ดข้าวโพดยุบตัวเข้าด้านใน", correct : false},
            {text: "สารเคมีในเมล็ดข้าวดพดทำปฏิกิริยาฟิวชัน", correct : false},
            {text: "แป้งในข้าวโพดขายตัว", correct : false},
        ]
    },
    {
        question: "เวลาทานสับปะรดแล้วแสบลิ้น เพราะสับประรดทำอะไรกับลิ้นของเรา ?",
        image: "pineapple.jpg",
        answers: [
            {text: "ขูด", correct : false},
            {text: "ย่อย", correct : true},
            {text: "ลวก", correct : false},
            {text: "ไม่ทำอะไร เราคิดไปเอง", correct : false},
        ]
    },
    {
        question: "ทำไมหลังจากกินข้าวเหนียวแล้วรู้สึกง่วงมากกว่าทานข้าวเจ้า ?",
        image: "rice.jpg",
        answers: [
            {text: "กระเพราะบีบตัวมากกว่าจนร่างกายเหนื่อยล้า", correct : false},
            {text: "ข้าวเหนียวมีใยอาหารสูงกว่าข้าวเจ้า", correct : false},
            {text: "สมองหลังฮอร์โมนความง่วงออกมามากกว่า", correct : true},
            {text: "จริงๆแล้วข้าวเหนียวไม่ได้ทำให้ง่วง เราคิดไปเอง", correct : false},
        ]
    },
    {
        question: "หมาหอนเพราะอะไร ?",
        image: "dog.jpg",
        answers: [
            {text: "ง่วง", correct : false},
            {text: "กลัว", correct : false},
            {text: "เห็นผี", correct : false},
            {text: "เหงา", correct : true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetStart();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    if (currentQuestion.image) {
        document.getElementById("question-image").src = currentQuestion.image;
        document.getElementById("question-image").style.display = "block";
    } else {
        document.getElementById("question-image").style.display = "none";
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetStart() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetStart();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    document.getElementById("question-image").style.display = "none";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
