let loginNav = document.getElementById("login-nav")
let loginPop = document.getElementById("login-pop")

loginNav.addEventListener("click", ()=>{
    loginPop.classList.toggle("popup-show")
})

loginPop.addEventListener("click", (e)=>{
    if(e.target === loginPop){
        loginPop.classList.remove("popup-show")
    }
})


let dataNav = document.getElementById("data-nav")
let reportNav = document.getElementById("report-nav")

function displayLoginMsg(e){
    e.preventDefault()
    alert("Please Login First !!")
}

dataNav.addEventListener("click", displayLoginMsg)
reportNav.addEventListener("click", displayLoginMsg)

let form = document.querySelector("form")
let emailInp = document.querySelector("#email")
let passwordInp = document.querySelector("#password")
let loginMsg = document.querySelector("#login-msg")

form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let email = emailInp.value
    let password = passwordInp.value

    form.style.display = "none"
    loginMsg.innerText = "Please wait.. Loggin in!"
    
    setTimeout(()=>{
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }) .then((res)=> {
            if(res.ok){
                loginMsg.innerText = "Admin Login Successful"
                setTimeout(()=>{
                    window.location.href = "data.html"
                }, 2000)
            } else{
                form.style.display = "block"
                loginMsg.innerText = "Login Failed !!"
                emailInp.value = ""
                passwordInp.value = ""
            }
        }) .catch((err)=>{
            form.style.display = "block"
            loginMsg.innerText = "Please Try Again ..!"
            emailInp.value = ""
            passwordInp.value = ""
        })
    }, 2000)
})