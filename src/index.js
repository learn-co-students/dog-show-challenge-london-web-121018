const table = document.querySelector("#table-body")
const formEl =  document.querySelector("#dog-form")
const nameInput = formEl.querySelector('input[name="name"]')
const breedInput = formEl.querySelector('input[name="breed"]')
const sexInput = formEl.querySelector('input[name="sex"]')
const state = {
dogs: [],
selectedDog: null
}

// add single dog
const addDog = (dog) => {
  const row = document.createElement('tr')
  row.innerHTML =
  `
    <td data-id = ${dog.id}>${dog.name}</td>
    <td data-id = ${dog.id}>${dog.breed}</td>
    <td data-id = ${dog.id}>${dog.sex}</td>
    <td>
      <button  class = "edit-btn" data-id = ${dog.id} >Edit</button>
      </td>
  `
  table.appendChild(row)
}

// add multiple dogs
const addDogs = (dogs) => {
  table.innerHTML =""
  dogs.forEach(addDog)
}

// edit listener
const editListener = () => {
  document.addEventListener('click', event => {
    if (event.target.className === "edit-btn"){
    const id = parseInt(event.target.dataset.id)
    state.selectedDog = state.dogs.find(dog => dog.id === id)
    populateEditForm(state.selectedDog)
    }
  })
}

//submit
formEl.addEventListener('submit', event => {
    event.preventDefault()
    updateDog()
    updateDogServer(state.selectedDog)
    .then(addDogs(state.dogs))
})

// update dog

// populate edit form
const populateEditForm = (dog) => {
  nameInput.value = state.selectedDog.name
  breedInput.value = state.selectedDog.breed
  sexInput.value = state.selectedDog.sex
}

// update dog
const updateDog = () => {
  state.selectedDog.name = nameInput.value
  state.selectedDog.breed = breedInput.value
  state.selectedDog.sex = sexInput.value
}
// server
function getDogs () {
  return fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
}

function updateDogServer (dog) {
  return fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog)
  }).then(resp => resp.json())
}

//initalize
getDogs()
.then(dogs => {
  state.dogs = dogs
  addDogs(state.dogs)
})
editListener()
