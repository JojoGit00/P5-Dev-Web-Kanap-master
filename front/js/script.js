const url = "http://localhost:3000/api/products";
const productSection = document.querySelector(".items");

fetch(url)
  .then((res) => res.json())
  .then((art) => {
    console.log(art);
    const produit = art; // isolation de ma constanse produit issus de son appel a lAPI isolé sous le nom de 'art' = aux dif canapés
  })