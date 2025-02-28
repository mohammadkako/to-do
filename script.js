let addButtom = document.querySelector(".buttom")
let form = document.querySelector("form")
let container = document.querySelector(".container")

addButtom.addEventListener("click",(e)=>{
    e.preventDefault()
    buttom.style.display ="none"
    form.style.display ="flex"
    container.style.filter ="blur(3px)"
})

