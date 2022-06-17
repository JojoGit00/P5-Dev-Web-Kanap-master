let productSection = document.querySelector("#cart__items");
let cartItems = JSON.parse(localStorage.getItem("products"));
let cartFormOrder = document.querySelector(".cart__order__form");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticle = [];
let totalOrder = [];

// function for display the cart


function displayCart() {
if (cartItems === null || cartItems == 0) {
  const emptyCart = `<p>Votre panier est vide</p>`;
  productSection.innerHTML = emptyCart;
}else {
  productSection.innerHTML = "";
  cartItems.forEach((productLS) => {
    fetch("http://localhost:3000/api/products/" + `${productLS.id}`)
      .then((res) => res.json())
      .then((productAPi) => {
        console.log(productAPi);
        productSection.innerHTML += `
                <article class="cart__item" data-id=${productAPi.id}>
                    <div class="cart__item__img">
                        <img src=${productAPi.imageUrl} alt=${productAPi.altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${productAPi.name}</h2>
                            <p>${productAPi.price}€</p>
                            <p>${productLS.color}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"
                                value="${productLS.quantity}">
                            </div>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </article>
            `;


        const changeQuantity = document.querySelectorAll(".itemQuantity");
        let notification = document.querySelectorAll(
          ".cart__item__content__settings__quantity"
        );
        const regexQuantity = /^(100|[1-9][0-9]?)$/;
        
        changeQuantity.forEach((input, i) => { 
          input.addEventListener("change", (e) => {
            if (input.value.match(regexQuantity)) {
              const finalQuantity = parseInt(e.target.value);
              cartItems[i].quantity = finalQuantity;
              updateCart(cartItems);
            } else {
              let myItem = cartItems.find(
                (item) =>
                  item.color === cartItems[i].color &&
                  item.id === cartItems[i].id
              );
            }
          });
        });
        //Calcul prix total
        totalOrder.push(productAPi.price * productLS.quantity);
        let sumOrder = 0;
        for (let i = 0; i < totalOrder.length; i++) {
          sumOrder += totalOrder[i];
        }
        totalPrice.innerHTML = sumOrder.toString();
        //Calcul articles total
        totalArticle.push(productLS.quantity);
        let sumArticles = 0;
        for (let j = 0; j < totalArticle.length; j++) {
          sumArticles += totalArticle[j];
        }
        totalQuantity.innerHTML = sumArticles + " ";
        //suppression article
        const suppressButtons = document.querySelectorAll(".deleteItem");
        suppressButtons.forEach((button, i) => {
          if (
            cartItems.find(
              (item) =>
                item.color === cartItems[i].color && item.id === cartItems[i].id
            )
          ) {
            button.addEventListener("click", () => {
              cartItems.splice(i, 1);
              updateCart(cartItems);
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
}
displayCart();


// fonction pour mettre a jour le panier

function updateCart(cartItem) {
  if (cartItems.length === 0) {
    localStorage.removeItem("products");
  } else {
    localStorage.setItem("products", JSON.stringify(cartItem));
  }
  location.reload();
}

// formulaire

function formulaire() {
  const regexName = /^[a-zA-ZÀ-ÿ' -]+$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  const regexAddress = /^[a-zA-ZÀ-ÿ' -]+$/;
  const regexCity = /^[a-zA-ZÀ-ÿ' -]+$/;

  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const address = document.querySelector("#address");
  const city = document.querySelector("#city");
  const email = document.querySelector("#email");

  const firstNameError = document.getElementById("firstNameErrorMsg");
  const lastNameError = document.getElementById("lastNameErrorMsg");
  const addressError = document.getElementById("addressErrorMsg");
  const cityError = document.getElementById("cityErrorMsg");
  const emailError = document.getElementById("emailErrorMsg");

  const order = document.getElementById("order");

  // fonction pour verifier le prenom
  firstName.addEventListener("blur", (e) => {
    if (firstName.value.match(regexName)) {
      firstNameError.innerHTML = "";
    } else {
      firstNameError.innerHTML = "Veuillez entrer un prénom valide";
    }
  });

  // fonction pour verifier le nom
  lastName.addEventListener("blur", (e) => {
    if (lastName.value.match(regexName)) {
      lastNameError.innerHTML = "";
    } else {
      lastNameError.innerHTML = "Veuillez entrer un nom valide";
    }
  });

  // fonction pour verifier l'adresse
  address.addEventListener("blur", (e) => {
    if (address.value.match(regexAddress)) {
      addressError.innerHTML = "";
    } else {
      addressError.innerHTML = "Veuillez entrer une adresse valide";
    }
  });

  // fonction pour verifier la ville
  city.addEventListener("blur", (e) => {
    if (city.value.match(regexCity)) {
      cityError.innerHTML = "";
    } else {
      cityError.innerHTML = "Veuillez entrer une ville valide";
    }
  });

  // fonction pour verifier l'email
  email.addEventListener("blur", (e) => {
    if (email.value.match(regexEmail)) {
      emailError.innerHTML = "";
    } else {
      emailError.innerHTML = "Veuillez entrer un email valide";
    }
  });

  order.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      firstName.value.match(regexName) &&
      lastName.value.match(regexName) &&
      address.value.match(regexAddress) &&
      city.value.match(regexCity) &&
      email.value.match(regexEmail)
    ) {
      orderId();
    }
  });

  function orderId() {
    let purchase = [];
    for (let productPurchase of cartItems) {
      purchase.push(productPurchase.id);
    }

    // objet contact constituer des données du formulaire pour ensuite les mettres dans le tableau de produits
    const client = {
      products: purchase,
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
    };

    // Requête POST via Fetch pour envoyer les informations au back end
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      // transforme l'objet client en contenu JSON
      body: JSON.stringify(client),
      headers: { "Content-Type": "application/json" },
    })
      // On envoie les données saisies du client et ses produits
      .then((res) => res.json())
      .then((value) => {
        // Permet d'effacer ce qui est stocké dans le localStorage
        localStorage.clear();
        window.location.href = `../html/confirmation.html?id=${value.orderId}`;
      })
      .catch((err) => console.log(err));
  }
}

// fonction formulaire pour le panier
formulaire();
