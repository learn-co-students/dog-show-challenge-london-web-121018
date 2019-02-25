const dogsUrl = 'http://localhost:3000/dogs'
const dogForm = document.querySelector('#dog-form');

function fetchData(url) {
  return fetch(url).then(resp => resp.json());
}

function patchDog(dog) {
  return fetch(`http://localhost:3000/dogs/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    });
}

function showDogs(dogs){
  const table = document.querySelector('#table-body');
  table.innerHTML = '';
  dogs.forEach(dog => {
    table.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id ="edit-${dog.id}">Edit</button></td></tr>`
  });
  return dogs;
};

function editDog(dog) {
  dogForm.id.value = dog.id;
  dogForm.name.value = dog.name;
  dogForm.breed.value = dog.breed;
  dogForm.sex.value = dog.sex;
};

function loadDogs(){
  fetchData(dogsUrl)
    .then(dogs => showDogs(dogs))
    .then(dogs => dogs.forEach(dog =>{
      document.querySelector(`#edit-${dog.id}`).addEventListener('click', e => {
        editDog(dog);
      });
    }));
};

loadDogs()

dogForm.addEventListener('submit', e => {
  e.preventDefault();
  if(dogForm.id.value !== ""){
    editedDog = { id: dogForm.id.value,
      name: dogForm.name.value,
      breed: dogForm.breed.value,
      sex: dogForm.sex.value
    };
    patchDog(editedDog).then(resp => loadDogs());
    dogForm.reset();
  } else {
    alert("please select a dog to edit!");
  };
});
