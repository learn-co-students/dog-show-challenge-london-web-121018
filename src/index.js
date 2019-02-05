// document.addEventListener('DOMContentLoaded', () => {
//
// })

const table = document.querySelector('table');
const tableBody = document.querySelector('#table-body')

const state = {
  dogs: []
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
    <td class="padding center"><button>Edit</button></td>
  `;
  tableBody.appendChild(tableRow);
}

// render multiple Dogs

function renderMultipleDogs(dogs) {
  dogs.forEach(dog => renderSingleDog(dog))
}

function initialize() {
  getDogs()
    .then(dogs => {
      state.dogs = dogs
      renderMultipleDogs(state.dogs)
    })

}

// server stuff

function getDogs() {
  return fetch('http://localhost:3000/dogs')
      .then(resp => resp.json())
}

initialize()
