async function fetchAndRenderData(){
    let res = await fetch("http://localhost:3000/users")
    let data = await res.json()
    return data
}

async function deleteCard(id){
    let res = await fetch(`http://localhost:3000/users/${id}`,{
        method: "DELETE",
    })

    let response = await res.json()

    let card = document.getElementById(id)
    card.remove()
}

async function editCard(id){
    let res = await fetch(`http://localhost:3000/users/${id}`)
    let data = await res.json()

    let form = document.getElementById("form-cont")
    form.style.display = "block"

    let professionInp = document.getElementById("profession")
    professionInp.value = data.profession

    let submitBtn = document.getElementById("submit-btn")
    submitBtn.addEventListener("click", async(e)=>{
        e.preventDefault()

        let updatedata = {
            profession: professionInp.value
        }

        let res = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedata)
        })

        let response = document.getElementById( `profession-${id}`)
        profession.textContent = `Profession: ${updatedata.profession}`

        form.style.display = "none"
    })
}

async function createNewCard(){
    let userData = await fetchAndRenderData()

    let cont = document.createElement("div")

    userData.forEach((ele) => {
        let card = document.createElement("div")
        card.id = ele.id
        card.className = "card"

        let img = document.createElement("img")
        img.src = user.gender == "male" ? "https://i.pinimg.com/564x/90/09/8a/90098a7afb44e3c3233456b252cb8b01.jpg" : "https://i.pinimg.com/564x/f9/ca/9b/f9ca9beca9b811fd47a59220588fd799.jpg"
        img.alt = "Profile Pic"

        let name = document.createElement("h2")
        name.textContent = ele.name

        let age = document.createElement("p")
        age.textContent = `Age: ${ele.age}`

        let place = document.createElement("p")
        place.textContent = `Place: ${ele.place}`

        let batch = document.createElement("p")
        batch.textContent = `Batch: ${ele.batch}`

        let profession = document.createElement("p")
        profession.id = `Profession-id: ${ele.id}`
        profession.textContent = `Profession: ${ele.profession}`

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener("click", async()=>{
            await deleteCard(ele.id)
        })

        let editBtn = document.createElement("button")
        editBtn.textContent = "Edit"
        editBtn.addEventListener("click", async()=>{
        await editCard(ele.id)
        })

        card.appendChild(img, name, age, place, batch, profession, deleteBtn, editBtn)

        cont.appendChild(card)
    });

    document.body.appendChild(cont)
}

createNewCard()