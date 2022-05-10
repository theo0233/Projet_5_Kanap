






let comparingProduct = [];
let local = JSON.parse(localStorage.getItem("product"));
console.log(local)

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
      console.log(objetProduits);
      // appel de la fonction dataForDisplay
      dataForDisplay(objetProduits);
      
  })

  function dataForDisplay(fromApi) {
    // on récupèration du panier 
    
    let local = JSON.parse(localStorage.getItem("product"));
    // si il y a un panier 
    if (local && local.length != 0) {
      // correspondance clef/valeur api/ panier
      for (let choix of local) 
      {
        console.log(choix)
        
        
        for (let g = 0, h = fromApi.length; g < h; g++) {
          if (choix._id === fromApi[g]._id) {
            // valeurs pour l'affichage
            choix.name = fromApi[g].name;
            choix._id = fromApi[g]._id;
            choix.prix = fromApi[g].price;
            choix.image = fromApi[g].imageUrl;
            choix.description = fromApi[g].description;
            choix.alt = fromApi[g].altTxt;
            
            console.log(choix);

          }
          
        }
      
      }
      display(local);
      
      
    } 
    else {
      // si pas de panier 
      
      document.querySelector("h1").innerHTML =
        "Vous n'avez pas d'article dans votre panier";
    }
    
 
  }
  
  function display(data) {
    // on déclare et on pointe la zone d'affichage
    let zonePanier = document.querySelector("#cart__items");
    // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
    zonePanier.innerHTML += data.map((choix) => 
    `<article class="cart__item" data-id="${choix._id}" data-couleur="${choix.color}" data-quantité="${choix.quantity}"> 
      <div class="cart__item__img">
        <img src="${choix.image}" alt="${choix.alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${choix.name}</h2>
          <span>couleur : ${choix.color}</span>
          <p data-prix="${choix.prix}">${choix.prix} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" id="${choix._id}" data-id="${choix._id}" data-color="${choix.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${choix._id}" data-color="${choix.color}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
      ).join(""); 
    // reste à l'écoute des modifications de quantité pour l'affichage et actualiser les données
    quantityModification();
    deleteProduct();
    // totalPrice();
  }

  
  const quantityModification = async (display) => {
    await display;
      document.querySelectorAll('input').forEach(product => {
            product.addEventListener("change", (e) => {
              let itemToChange = e.target.dataset.id;
              let colorSelection = e.target.dataset.color;
              let newQuantity = e.target.value;
              console.log(itemToChange);
              console.log(newQuantity);
              console.log(colorSelection);
              for (i=0; i < local.length; i++) {
                if(local[i]._id == itemToChange && local[i].color == colorSelection) {
                  console.log("maj quantite")
                  return(
                    local[i].quantity = newQuantity,
                    localStorage.setItem("product", JSON.stringify(local),
                    
                  ));
                }
              }
            });
      });
  };
  
  const deleteProduct = async (display) => {
    await display;
    console.log('testDELETE')
    let supprimer = document.querySelectorAll('.deleteItem')
    
    console.log(supprimer);
      supprimer.forEach((productToDelete) => {
      productToDelete.addEventListener("click", () => {
      console.log(productToDelete);
  
      let allProductOnStorage = local.length;
      console.log(allProductOnStorage)
      
  
      if(allProductOnStorage == 1){
        return (localStorage.removeItem("product")
        );
      } 
      else { 
        console.log
        comparingProduct = local.filter(element => {
          console.log(element)
          if( productToDelete.dataset.id != element._id || productToDelete.dataset.color != element.color) {
          console.log("oOOOOOOOOOO")
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
      
      
     /* bouton commander */
     
      const commandButton = document.getElementById('order');
       
      
        commandButton.addEventListener('click', (e) => {
          e.preventDefault();
          console.log("click confirmation")
      
          if (!local) {
            alert(
              "Panier vide, veuillez sélectionner un ou plusieurs articles pour passer commande"
            );
          }
          let productId = [];
            for (let i = 0; i < local.length; i++) {
              productId.push(local[i]._id);
            }
            console.log(productId)
      
          /* objet contact avec les infos du formulaire et insertion du tableau de produits */
            let commandOrder = {
              contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
              },
              products: productId,
            };
  
            console.log(commandOrder);
            /* option de la method post fetch */
            const postOptions = {
              method: 'POST',
              body: JSON.stringify(commandOrder),
              headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
              },
            };
            /* Appel de l'API pour post les informations order */
            fetch('http://localhost:3000/api/products/order', postOptions)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                const orderId = data.orderId;
                console.log(orderId);
                // redirection vers la page confirmation 
                window.location.href = 'confirmation.html' + '?orderId=' + orderId; 
              })
              
              .catch((error) => {
                alert(error);
              });
            });
          
  
          
          
        
      
    
   
    
    
   
  
 