const url = "http://localhost:3000/api/products";
const productSection = document.querySelector(".items");

fetch(url)
  .then((res) => res.json())
  .then((art) => {
    console.log(art);
    const produit = art; // isolation de ma constanse produit issus de son appel a lAPI isolé sous le nom de 'art' = aux dif canapés
    console.log(produit);
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
    /* J'écrit ici la suite
        Je me rend a ID Item cf index.html
        utilisation de fonction inner dans la section 
        copie du code html 
        remplacement des morceaux de code avec les éléments dont j'ai besoin.
        donc Si ajout de d'article a la base de lApi celui ci sera directement intégré !!
          */
  })

  .catch((error) => {
    console.log(error);
  });

