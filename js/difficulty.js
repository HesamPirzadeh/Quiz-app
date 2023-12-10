const buttons = document.querySelectorAll("button")

const selectHandler = (event)=>{
    const level = event.target.innerText.toLowerCase()
    // because it is text we dont use json.stringfy
    localStorage.setItem("level",level)
    window.location.assign("/")
}

buttons.forEach(button => {
    button.addEventListener("click",selectHandler)
});