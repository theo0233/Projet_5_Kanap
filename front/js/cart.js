let productFromStorage = JSON.parse(localStorage.getItem("product"));

console.log(productFromStorage);

const cartDisplay = async () => {
  
if (productFromStorage) {
    await productFromStorage;
    
    console.log(productFromStorage);
    cart__items.innerHTML = productFromStorage.map(
        (product) => `
    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price} € </p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id} data-color="${product.color} >Supprimer</p>
        </div>
      </div>
    </div>
  </article> -->
</section>
<div class="cart__price">
  <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"> "${product.quantity * product.price} "</span> €</p>
</div>
        `
  )}
  
else {
  alert("votre panier est vide");
};
};
cartDisplay();