let comparingProduct = [];
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
          <input type="number" id="${product._id}" data-id="${product._id}" data-color="${product.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem" data-id="${product._id}" data-color="${product.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article> -->
</section> `
    );
    quantityModification();
    deleteProduct();
  } else {
    alert("votre panier est vide");
  }
};

cartDisplay();

const quantityModification = async (cartDisplay) => {
  await cartDisplay;
    document.querySelectorAll('input').forEach(product => {
          product.addEventListener("change", (e) => {
            let itemToChange = e.target.dataset.id;
            let colorSelection = e.target.dataset.color;
            let newQuantity = e.target.value;
            console.log(itemToChange,colorSelection,newQuantity);
            for (i=0; i < productFromStorage.length; i++) {
              if(productFromStorage[i]._id == itemToChange && productFromStorage[i].color == colorSelection) {
                console.log("maj quantite")
                return(
                  productFromStorage[i].quantity = newQuantity,
                  localStorage.setItem("product", JSON.stringify(productFromStorage),
                  productFromStorage = JSON.parse(localStorage.getItem("product")))
                );
              }
            }
          });
    });
};

const deleteProduct = async (cartDisplay) => {
  await cartDisplay;
  console.log('testDELETE')
  let supprimer = document.querySelectorAll('.deleteItem')
  console.log(supprimer);
    supprimer.forEach((productToDelete) => {
    productToDelete.addEventListener("click", () => {
    console.log(productToDelete);

    let allProductOnStorage = productFromStorage.length;
    console.log(allProductOnStorage)

    if(allProductOnStorage == 1){
      return (localStorage.removeItem("product")
      );
    } 
    else { 
      comparingProduct = productFromStorage.filter(element => {
      
      if(supprimer.dataset.id != element._id || supprimer.dataset.color != element.color) {
        return true
      }
    });
    

    }
    
  });
  });
};

      
