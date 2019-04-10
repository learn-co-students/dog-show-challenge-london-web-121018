// document.addEventListener('DOMContentLoaded', () => {
//
// })

const table = document.querySelector('table');
const tableBody = document.querySelector('#table-body')
const inputName = document.querySelector('#inputName')
const inputBreed = document.querySelector('#inputBreed')
const inputSex = document.querySelector('#inputSex')
const form = document.querySelector('form')


const state = {
  dogs: [],
  selectedDog: null
}

// add a single dog to the page

function renderSingleDog(dog) {
  const tableRow = document.createElement('tr');
  tableRow.className = "padding";
  tableRow.dataset.id = dog.id;

  tableRow.innerHTML = `
    <td class="padding">${dog.name}</td>
    <td class="padding">${dog.breed}</td>
    <td class="padding">${dog.sex}</td>
    <td class="padding center"><button class="edit-btn" data-id="${dog.id}">Edit Dog</button><button class="delete-btn" data-id="${dog.id}">Delete</button></td>
  `;
  tableBody.appendChild(tableRow);
}

// render multiple Dogs

function renderMultipleDogs() {
  tableBody.innerHTML = '';
  state.dogs.forEach(dog => renderSingleDog(dog))
}

// event listener for edit button

// function clickToEdit() {
  document.addEventListener('click', event => {
    if (event.target.className === 'edit-btn') {
      const id = parseInt(event.target.dataset.id)
      const foundDog = state.dogs.find(dog => dog.id === id)
      // inputName.placeholder = dog.name
      // inputBreed.placeholder = dog.breed
      // inputSex.placeholder = dog.sex

        inputName.value = foundDog.name
        inputBreed.value = foundDog.breed
        inputSex.value = foundDog.sex
        state.selectedDog = foundDog
        // debugger
    }

  })
// }
  form.addEventListener('submit', event => {
    state.selectedDog.name = inputName.value
    state.selectedDog.breed = inputBreed.value
    state.selectedDog.sex = inputSex.value

    event.preventDefault();

    updateDog()
      .then(initialize);
  })

  document.addEventListener('click', event => {
    if(event.target.className === 'delete-btn') {
      const id = event.target.dataset.id
      const foundDog = state.dogs.find(dog => dog.id == id)
      state.selectedDog = foundDog
      deleteDog()
        .then(initialize)
    }

  })

// function updateDogTable() {
//   table.innerHTML = '';
// }



// initializer
function initialize() {
  getDogs()
    .then(dogs => {
      state.dogs = dogs
      renderMultipleDogs()
    })

}

// server stuff

function getDogs() {
  return fetch('http://localhost:3000/dogs')
      .then(resp => resp.json())
}

function updateDog() {
  const dog = state.selectedDog

  return fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog)
  }).then(resp => resp.json())
}

function deleteDog() {
  const dog = state.selectedDog
  return fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: 'DELETE'
  })
}

initialize()
