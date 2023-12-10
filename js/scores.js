const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const list = document.querySelector("ol")

const content = highScore.map((score, index) => {
  return `
     <li>
      <span>${index + 1}</span>
      <p>${score.name}</p>
      <span>${score.score}</span>
     </li>`;
});
console.log(content);
list.innerHTML = content.join("");
