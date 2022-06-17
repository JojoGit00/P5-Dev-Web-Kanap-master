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

//fetch pour récupérer les données du produit en fonction de son id

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((kanap) => {
    console.log(kanap);
    document.title = kanap.name;
    img.src = kanap.imageUrl;
    img.alt = kanap.altTxt;
    nom.innerHTML = kanap.name;
    price.innerHTML = kanap.price;
    descript.innerHTML = kanap.description;
    kanap.colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  })
  .catch((err) => console.log(err));

//fonction pour ajouter au panier
const addToCart = document.querySelector("#addToCart");

addToCart.addEventListener("click", () => {

  const selectColor = document.querySelector("#colors"); //
  const quantity = document.querySelector("#quantity"); //
  const cart = JSON.parse(localStorage.getItem("products")) || []; //
  const product = {
    // création d'un objet product
    id: id,
    name: nom.innerHTML,
    price: price.innerHTML,
    quantity: parseInt(quantity.value),
    color: selectColor.value,
    image: img.src,
    alt: img.alt,
  };
  // si panier vide, ajout du produit au panier
  if (cart.find((item) => item.id === product.id && item.color === product.color)){ 
    cart.forEach((item) => {
      if (item.id === product.id) {
        item.quantity += product.quantity;
      }
    });
    // sinon on ajoute le produit au panier
  } else {
    cart.push(product);
  }
  localStorage.setItem("products", JSON.stringify(cart));
  console.log(cart);
});
