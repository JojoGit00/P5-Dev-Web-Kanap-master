//Reccuperer l'id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

/* INSERTION DES ELEMENTS  SUIVANT DANS LA PAGE PRODUITS

                          titre - img alt - nom - Prix - descripttion  */

// titre pas besoin de variable dans le head

// Variable Img
let divImg = document.querySelector(".item__img");
let img = document.createElement("img");
divImg.appendChild(img);
// Variable name
let nom = document.querySelector("#title");
// Variable prix
let price = document.querySelector("#price");
// Variable description
let descript = document.querySelector("#description");
// Variable color
let select = document.querySelector("#colors");

//fonction fetch

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((kanap) => {
    document.title = kanap.name;
    img.src = kanap.imageUrl;
    img.alt = kanap.altTxt;
    nom.innerHTML = kanap.name;
    price.innerHTML = kanap.price;
    descript.innerHTML = kanap.description;
    kanap.colors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  })
.catch((err) => console.log(err));


