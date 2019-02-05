const dogsUrl = 'http://localhost:3000/dogs'  
const tableBodyEl = document.querySelector('#table-body');
const editFormEl = document.querySelector('#dog-form');

const state = {
    dogs: [],
    selectedDog: null
};

const showDog = (dog) => {
    const dogEl = document.createElement('tr');

    dogEl.innerHTML = `<td>${dog.name}</td> 
                       <td>${dog.breed}</td> 
                       <td>${dog.sex}</td> 
                       <td><button data-id=${dog.id} class='edit-btn'>Edit Dog</button></td>`;
    tableBodyEl.appendChild(dogEl);
};

const renderDogs = () => {
    tableBodyEl.innerHTML = ''
    state.dogs.forEach(dog => showDog(dog));
};

const fillInForm = () => {
    editFormEl.name.value = state.selectedDog.name
    editFormEl.breed.value = state.selectedDog.breed
    editFormEl.sex.value = state.selectedDog.sex
};

const findDog = (findId) => {
    return state.dogs.find(dog => dog.id === findId)
};

const editDog = () => {
    const updatedDog = {
        name: editFormEl.name.value,
        breed: editFormEl.breed.value,
        sex: editFormEl.sex.value
    };
    state.selectedDog = Object.assign(state.selectedDog, updatedDog)  
};

const addEventListenerEditBtn = () => {
    document.addEventListener('click', event => {
        if (event.target.className === 'edit-btn') {
            id = parseInt(event.target.dataset.id)
            state.selectedDog = findDog(id)
            fillInForm()
        };
    });
};

const addEventListenerSubmitBtn = () => {
    editFormEl.addEventListener('submit', event => {
        event.preventDefault();
        editDog()
        // debugger
        // console.log(state.selectedDog)
        patchDogs(state.selectedDog)
            .then(renderDogs())
        editFormEl.reset()
        state.selectedDog = null
    })
};
//server fetch

const getDogs = () => {
    return fetch(dogsUrl)
        .then(resp => resp.json())
        
};

const patchDogs = (dog) => {
    // debugger
    console.log(dog)
    return fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(dog)
    }).then(resp => test = resp.json())
    .then(console.log)
};
let test = null

// initialize function
const init = () => {
    getDogs()
        .then((jso) => {
            state.dogs = jso
            renderDogs()
        });
    addEventListenerEditBtn();
    addEventListenerSubmitBtn();
};

init();