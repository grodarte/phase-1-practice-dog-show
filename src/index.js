document.addEventListener('DOMContentLoaded', () => {
    dogForm = document.getElementById("dog-form")

    getRegisteredDogs()
})

function getRegisteredDogs(){
    fetch("http://localhost:3000/dogs")
    .then(res=>res.json())
    .then(dogData => dogData.forEach(dog => renderDog(dog)))
}

function renderDog(dog){
    let dogRow = document.createElement("tr")
    dogRow.innerHTML= `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit Dog</button></td>
    `
    document.getElementById("table-body").appendChild(dogRow)
    dogRow.querySelector("button").addEventListener("click", (e) => {populateDogForm(dog)})
}

function populateDogForm(dog){
    dogForm["name"].value = dog.name
    dogForm["breed"].value = dog.breed
    dogForm["sex"].value = dog.sex
    dogForm.addEventListener("submit", e => {
        updateDog(dog)
    })
}

function updateDog(dog){
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type":"application/json",
        Accept:"application/json"
    },
    body: JSON.stringify({
        name: dogForm["name"].value,
        breed: dogForm["breed"].value,
        sex: dogForm["sex"].value
    })})
    .then(res=>res.json())
    .then(dogData => console.log(dogData))
}