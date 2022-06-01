//Reccuperer l'id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

fetch("http://localhost:3000/api/products/" + id)
  .then(response => response.json())
  .then(response => handleResponse(response))
  .catch((error) => {console.log(error);});


function handleResponse(kanap) {
  document.title = kanap.name;
  const { altTxt, colors, description, imageUrl, price, _id, name } = kanap;
  makeImage(imageUrl, altTxt);
  makeName(name);
  makeDescription(description);
  makePrice(price);
  makeColors(colors);
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl
  image.alt = altTxt
  const parent = document.querySelector(".item__img");
  if (parent !== null) parent.appendChild(image);
}

function makePrice(price) {
  const prix = document.querySelector("#price");
  if (prix !== null) prix.innerHTML = price;
}

function makeDescription(description) {
  const parent = document.querySelector("#description");
  if (parent !== null) parent.innerHTML = description;
}

function makeName(name) {
  const h1 = document.querySelector("#title");
  if (h1 !== null) h1.textContent = name;
}

function makeColors (colors) {
  const select = document.querySelector("#colors");
  if (select !== null) {
    colors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
    
  }
}
