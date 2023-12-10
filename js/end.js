const score = JSON.parse(localStorage.getItem("score"));

const p = document.querySelector("#score");
const button = document.querySelector("button");
const input = document.querySelector("input");
// [] this is for when returtn undifined 
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

p.innerText = score;

const saveHandler = () => {
  // if we dont fill any it will return falsy and if yo have 0 score again it is falsy
  if (!input.value || !score) {
    alert("Invalid");
  } else {
    // score is score : score because wwe have same key and value
    const finalScore = { name: input.value, score };
    // first push into variable that has localstorage or empty array
    highScore.push(finalScore)
    // then use this sort method
    highScore.sort((a,b)=> b.score - a.score)
    highScore.splice(10)
    localStorage.setItem("highScore",JSON.stringify(highScore))
    localStorage.removeItem("score")
    window.location.assign("/")
  }
};

button.addEventListener("click", saveHandler);
