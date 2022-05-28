
//Recuperation de la chaine de requête dans l'URL
const queryStringUrlId = window.location.search;

//Reccuperer l'id
const urlSearchParams = new URLSearchParams(queryStringUrlId);

const id = urlSearchParams.get("id");

console.log(id);


//les variables

let divImg = document.querySelector('.item__img');
let img = document.createElement('img');
divImg.appendChild(img);



//fonction fetch 

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((kanap) => {
    document.title = kanap.name;
    img.src = kanap.imageUrl;
    

  });
  
    
  