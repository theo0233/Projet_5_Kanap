let comparingProduct = [];
let productFromStorage = JSON.parse(localStorage.getItem("product"));
/* Creation d'un tableau vide */
let lesCanaps = [];
const fetchCanaps = async () => {
  await fetch("http://localhost:3000/api/products/")
      .then((res) => res.json())
      .then((promise) => {
          lesCanaps = promise;
          console.log(lesCanaps);
      });
};

console.log(lesCanaps);

console.log(productFromStorage);


const cartDisplay = async () => {

  if (productFromStorage) {
    await fetchCanaps();
    await productFromStorage;

    
    
    console.log(productFromStorage);
    cart__items.innerHTML = productFromStorage.map(
      (product) =>  
      
       `
    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>"${product.price}  " € </p>
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
    
  </article> 
</section> `
    )
    .join("");
    quantityModification();
    deleteProduct();
    totalPrice();
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
        if( productToDelete.dataset.id != element._id || productToDelete.dataset.color != element.color) {
        return true
        
      }
      
    });
    console.log(comparingProduct);
    localStorage.setItem("product",JSON.stringify(comparingProduct));
    }
  });
  });
  return;
};

const totalPrice = async (cartDisplay,quantityModification,deleteProduct) => {
  await cartDisplay;
  await quantityModification;
  await deleteProduct;
  console.log("calcul total");

  let unitPrice = [];
  let totalProductQuantity = [];
  let table = JSON.parse(localStorage.getItem("product"));
  let displayQuantity = document.querySelectorAll(".itemQuantity");
  console.log(displayQuantity);

  table.forEach((product) => {
    unitPrice.push(
      product.price * product.quantity,
    );
    totalProductQuantity.push(product.quantity);
  });
  console.log(totalProductQuantity);
  console.log(unitPrice);

  totalQuantity.textContent = `${eval(unitPrice.join("+"))}`;
  

};

// formulaire regular expression
function formRecovery() {
    
  let form = document.querySelector(".cart__order__form");
  let regexEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let regexNameCity= new RegExp("^[A-Z][A-Za-z\é\è\ê\-]+$");
  let regexAdress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification 
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });
    form.address.addEventListener('change', function() {
        validAddress(this);
    });
    form.city.addEventListener('change', function() {
        validCity(this);
    });
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation des inputs 
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (regexNameCity.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = 'Prénom correct';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (regexNameCity.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = 'Nom correct';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    const validAddress = function(inputAddress) {
        let addressError = inputAddress.nextElementSibling;

        if (regexAdress.test(inputAddress.value)) {
            addressError.innerHTML = 'Adresse correcte';
        } else {
            addressError.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (regexNameCity.test(inputCity.value)) {
            cityErrorMsg.innerHTML = 'Ville correcte';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (regexEmail.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = "Email correct";
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
  formRecovery();
  
  
 