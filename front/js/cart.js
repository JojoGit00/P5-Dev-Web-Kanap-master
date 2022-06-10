let productSection = document.querySelector("#cart__items");
let cartItems = JSON.parse(localStorage.getItem("products"));
let cartFormOrder = document.querySelector(".cart__order__form");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticle = [];
let totalOrder = [];

// fonction pour afficher le panier
if (cartItems !== null) {
  productSection.innerHTML = "";
  cartItems.forEach((productLS) => {
    fetch("http://localhost:3000/api/products/" + `${productLS.id}`)
      .then((res) => res.json())
      .then((productAPi) => {
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

// fonction pour mettre a jour le panier

function updateCart(cartItem) {
  if (cartItems.length === 0) {
    localStorage.removeItem("products");
  } else {
    localStorage.setItem("products", JSON.stringify(cartItem));
  }
  location.reload();
}
