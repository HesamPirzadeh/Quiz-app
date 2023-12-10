import formatData from "./helper.js";

const loader = document.querySelector("#loader");
const container = document.querySelector("#container");
const questionText = document.querySelector("#question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreSpan = document.querySelector("#score");
const nextBtn = document.querySelector("#next-btn");
const finishBtn = document.querySelector("#finish-btn");
const questionNo = document.querySelector("#question-number");
const error = document.querySelector("#error");


// if player has not choosen difficulty bu deafult set it on medium
const level = localStorage.getItem("level") || "medium";

const SCORE_BONUS = 10;
const URl =
  `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchHandler = async () => {
  try {
    const respond = await fetch(URl);
  const json = await respond.json();
  formattedData = formatData(json.results);
  start();
  } catch (err) {
    loader.style.display = "none";
    error.style.display = "block"
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  // questionIndex is index for formated data
  questionNo.innerText = questionIndex + 1
  const { answer, correctAnswers, question } = formattedData[questionIndex];
  correctAnswer = correctAnswers;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answer[index];
    console.log(correctAnswer);
  });
};
// cehck option code/true green false red
const checkanswer = (e, index) => {
  // deny access again
  if (!isAccepted) return;
  isAccepted = false;

  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    e.target.classList.add("correct");
    // show the score in dom
    score += SCORE_BONUS;
    scoreSpan.innerText = score;
  } else {
    e.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questionIndex++;
  // when access last question end it
  if (questionIndex < formattedData.length) {
    isAccepted = true
    removeClass()
    showQuestion()
  }else{
   finishHandler()
  }
};

const removeClass = ()=>{
 answerList.forEach((button)=>{
  button.classList = "answer-text"
 })
}

const finishHandler = ()=>{
  localStorage.setItem("score",JSON.stringify(score))
  window.location.assign("./end.html")
}

window.addEventListener("load", fetchHandler);
nextBtn.addEventListener("click", nextHandler);
finishBtn.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (e) => checkanswer(e, index));
});


console.log("hesam");