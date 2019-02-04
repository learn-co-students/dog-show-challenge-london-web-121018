const dogTable = document.querySelector('#table-body')
const dogNameForm = document.querySelector('#dog-name')
const dogBreedForm = document.querySelector('#dog-breed')
const dogSexForm = document.querySelector('#dog-sex')
const dogSubBtn = document.querySelector('#dog-sub-btn')

// state object
const state = {
  dogs: [],
  selectedDog: null
}

// add dog to table
function addDog(dog) {
	const dogTableRow = document.createElement('tr');
	dogTableRow.className = `row-${dog.id}`
	dogTableRow.innerHTML = `
		<td>${dog.name}</td>
		<td>${dog.breed}</td>
		<td>${dog.sex}</td>
		<td><button class='edit-btn' data-id='${dog.id}'>Edit</button></td>
	`
	dogTable.append(dogTableRow);
}

// add dogs to table
const addDogs = dogs => {
  dogs.forEach(addDog)
}

// dog edit button event listener
function dogEditBtnEventListener() {
  document.addEventListener('click', event => {
    if(event.target.className === 'edit-btn'){
      let dogId = parseInt(event.target.dataset.id)
      state.selectedDog = state.dogs.find( dog => dog.id === dogId)
      populateDogForm(state.selectedDog)
    }
  })
}

// populate edit dog form with selected dogs values
const populateDogForm = dog => {
  dogNameForm.value = dog.name
  dogBreedForm.value = dog.breed
  dogSexForm.value = dog.sex
}

// add event listener to edit submit button
function dogEditSubmitBtnListener() {
  dogSubBtn.addEventListener('click', () => {
    editDog(state.selectedDog)
  })
}

// edit dog
const editDog = dog => {
  dog.name = dogNameForm.value;
  dog.breed = dogBreedForm.value;
  dog.sex = dogSexForm.value;
  updateDog(dog);
}


// Server Stuff

// get dogs
const getDogs = () => {
  return fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
}

// update dog
const updateDog = dog => {
  return fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog)
  })
  .then(resp => resp.json())
}

// on initialization call these functions
function initialization() {
  getDogs()
  .then(dogs => {
    state.dogs = dogs
    addDogs(state.dogs);
  })
  dogEditBtnEventListener()
  dogEditSubmitBtnListener()
}

initialization();
