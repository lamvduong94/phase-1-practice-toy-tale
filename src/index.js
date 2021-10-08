let addToy = false;
const server = 'http://localhost:3000/toys';
const collection = document.getElementById('toy-collection');
const form = document.getElementsByClassName('add-toy-form');

function fetchToys() {
  return fetch(server)
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => addToyInfo(toy)))
}

function addToyInfo(toy) {
  const h2 = document.createElement('h2');
  h2.innerText = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';

  const p = document.createElement('p');
  p.innerText = `${toy.likes} likes`;

  const btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.id = toy.id;
  btn.innerText = 'Like';
  btn.addEventListener('click', () => {
    toy.p++;
    p.innerText = `${toy.p} likes`;
    increaseLikes();
  })

  const newDiv = document.createElement('div');
  newDiv.classList = 'card';
  collection.append(newDiv);
  newDiv.append(h2, img, p, btn);
}

function addNewToy(toy) {
  fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },

    body: JSON.stringify({
      'name': toy.name.value,
      'image': toy.image.value,
      'likes': 0
    })
  })

  .then(resp => resp.json())
  .then(data => {
    addToyInfo(data);
    collection.append(addToyInfo(data))
  })
}

function increaseLikes(e) {
  e.preventDefault()
  const increase = e.target.previousElementSibling.innerText + 1;
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },

    body: JSON.stringify({
      'likes': parseInt(increase)
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault()
        addNewToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();

});