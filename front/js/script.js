const url = "http://localhost:3000/api/products"; // url de l'api
const productSection = document.querySelector(".items"); // section des produits


// on crée un nouvel élément article pour chaque article de l'API et on l'ajoute à la section des produits

fetch(url) // on récupère les données de l'api
  .then((res) => res.json()) // on les transforme en json
  .then((art) => {
    console.log(art); // on les affiche dans la console
    const produit = art; // isolation de ma constanse produit issus de son appel a lAPI isolé sous le nom de 'art' = aux dif canapés
    console.log(produit); // affichage de la variable produit
    produit.forEach((produit) => {
      // utilisation de foreach "boucle" pour aller chercher les éléments dont jaurai besoin de "CHAQUE ARTICLE"
      productSection.innerHTML += `  
          <a href="./product.html?id=${produit._id}">
          <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}"/>
              <h3 class="productName">${produit.name}</h3>
              <p class="productDescription">${produit.description}</p>
          </article>
      </a>`;
    });
  })
  .catch((error) => {
    console.log(error);
  });

/* const url = "http://localhost:3000/api/products";
const productSection = document.querySelector('.items');

fetch(url)
    .then((res) => res.json())
    .then((res) => res.forEach(article => { 
        console.log(article)                    
        productSection.innerHTML += `
            <a href="./product.html?id=${article._id}">
                <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}"/>
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                </article>
            </a>
        `
    }))
    .catch(error => {
        console.log(error);
    });
 */
