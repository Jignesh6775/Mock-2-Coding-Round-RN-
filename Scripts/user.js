let form = document.getElementById("reg-form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let name = form.elements.name.value
    let age = form.elements.age.value
    let place = form.elements.place.value
    let batch = form.elements.batch.value
    let profession = form.elements.profession.value

    let res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            age,
            place,
            batch,
            profession
        })
    })
    console.log(res)
    if(res.ok){
        alert("User Register Successful")
        form.reset()
    } else{
        alert("Register Failed, Please Try Again !!")
    }
})