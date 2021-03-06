let comparingProduct = [];
var cmdButton = document.getElementById("order")
var regexEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);
var regexNameCity = new RegExp("^[A-Z][A-Za-zéèê-]+$");
var regexAdress = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);
var form = document.querySelector(".cart__order__form");
//cmdButton.setAttribute("disabled", "true")
console.log("cmdButton", cmdButton)
let local = JSON.parse(localStorage.getItem("product"));
console.log(local);

// fonction de recuperation des produits de l'API
const getProducts = async function() {
    let response = await fetch(`http://localhost:3000/api/products/`)
    let objetProduits = await response.json()
    console.log(objetProduits)
    return objetProduits
}
getProducts()

// fonction qui prépare les données pour l'affichage
async function dataForDisplay() {
    //  récupèration du panier
    let objetProduits = await getProducts();
    let local = JSON.parse(localStorage.getItem("product"));
    console.log(objetProduits)
    let priceTotal = 0;

    // si il y a un panier
    if (local && local.length != 0) {
        // correspondance clef/valeur api/ panier
        for (let choix of local) {


            for (let g = 0, h = objetProduits.length; g < h; g++) {
                if (choix._id === objetProduits[g]._id) {
                    // valeurs pour l'affichage
                    choix.name = objetProduits[g].name;
                    choix._id = objetProduits[g]._id;
                    choix.prix = objetProduits[g].price;
                    choix.image = objetProduits[g].imageUrl;
                    choix.description = objetProduits[g].description;
                    choix.alt = objetProduits[g].altTxt;


                    // calcul prix total
                    priceTotal += objetProduits[g].price * choix.quantity;
                    document.getElementById("totalPrice").innerHTML = priceTotal;

                }

            }
        }

        display(local);
    } else {
        // si pas de panier

        document.querySelector("#cart__items").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
        document.getElementById("totalPrice").innerHTML = priceTotal;
    }

}
dataForDisplay();

function display(data) {
    // on déclare et on pointe la zone d'affichage
    let zonePanier = document.querySelector("#cart__items");
    // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
    zonePanier.innerHTML = data
        .map(
            (choix) =>
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
        )
        .join("");

    quantityModification();
    deleteProduct();



}

function quantityModification() {

    document.querySelectorAll("input").forEach((product) => {
        product.addEventListener("change", (e) => {
            let itemToChange = e.target.dataset.id;
            let colorSelection = e.target.dataset.color;
            let newQuantity = e.target.value;
            for (let i = 0; i < local.length; i++) {
                if (local[i]._id === itemToChange && local[i].color === colorSelection) {
                    console.log("maj quantite");
                    local = JSON.parse(localStorage["product"]);
                    local[i].quantity = newQuantity,
                        localStorage.setItem("product", JSON.stringify(local)),
                        recalculatePrice();
                }
            }

        });

    });
};

function deleteProduct() {

    console.log("testDELETE");
    let supprimer = document.querySelectorAll(".deleteItem");
    let local = JSON.parse(localStorage.getItem("product"));
    console.log(supprimer);
    supprimer.forEach((product) => {
        product.addEventListener("click", () => {
            console.log("bouton supprimer du produit correspondant", product);

            let allProductOnStorage = local.length;
            console.log("nombre total de produit dans le local storage", allProductOnStorage);

            if (allProductOnStorage == 1) {
                localStorage.removeItem("product")

            } else {
                let comparingProduct = local.filter((element) => {
                    console.log(element);
                    if (
                        product.dataset.id != element._id ||
                        product.dataset.color != element.color
                    ) {
                        dataForDisplay()
                        return true

                    }
                });
                console.log("produit restant ", comparingProduct);
                console.log("avant rajout", local)
                localStorage.setItem("product", JSON.stringify(comparingProduct))
                console.log("apres rajout", local)


            }
            recalculatePrice()


        });
    });
    return;
};

const recalculatePrice = async () => {

    console.log("recalcul");
    let objetProduits = await getProducts();

    let priceTotal = 0;
    if (local && local.length != 0) {
        // correspondance clef/valeur api/ panier
        for (choix of local) {
            console.log(choix);

            for (let g = 0, h = objetProduits.length; g < h; g++) {
                if (choix._id === objetProduits[g]._id) {
                    // valeurs pour l'affichage

                    choix._id = objetProduits[g]._id;
                    choix.prix = objetProduits[g].price;

                    // calcul prix total
                    priceTotal += objetProduits[g].price * choix.quantity;
                    document.getElementById("totalPrice").innerHTML = priceTotal;
                }
            }
        }

    }
    dataForDisplay()
};


// formulaire regular expression
function formRecovery() {
    console.log("cmdButton formRecovery", cmdButton)


    // Ecoute de la modification
    form.firstName.addEventListener("change", function() {
        validFirstName(this);
        isFormValid();
    });
    form.lastName.addEventListener("change", function() {
        validLastName(this);
        isFormValid();
    });
    form.address.addEventListener("change", function() {
        validAddress(this);
        isFormValid();
    });
    form.city.addEventListener("change", function() {
        validCity(this);
        isFormValid();
    });
    form.email.addEventListener("change", function() {
        validEmail(this);
        isFormValid();
    });

    //validation des inputs

}

const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (regexNameCity.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = "Prénom correct";
        return true;
    } else {
        firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        return false;
    }
};
const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (regexNameCity.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = "Nom correct";
        return true;
    } else {
        lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        return false;
    }
};
const validAddress = function(inputAddress) {
    let addressError = inputAddress.nextElementSibling;

    if (regexAdress.test(inputAddress.value)) {
        addressError.innerHTML = "Adresse correcte";
        return true;
    } else {
        addressError.innerHTML = "Veuillez renseigner ce champ.";
        return false;
    }
};
const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;
    if (regexNameCity.test(inputCity.value)) {
        cityErrorMsg.innerHTML = "Ville correcte";
        return true;
    } else {
        cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        return false;
    }
};
const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (regexEmail.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = "Email correct";
        return true;
    } else {
        emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
        return false;
    }
};

function isFormValid() {

    console.log("test validité validFirstName" + validFirstName(form.firstName))
    console.log("test validité validLastName" + validLastName(form.lastName))
    console.log("test validité validEmail" + validEmail(form.email))
    console.log("test validité validCity" + validCity(form.city))
    console.log("test validité validAddress" + validAddress(form.address))

    if (validFirstName(form.firstName) && validLastName(form.lastName) && validEmail(form.email) && validCity(form.city) && validAddress(form.address)) {
        console.log("Le formulaire est maintenant valide");
        return true;
        //cmdButton.setAttribute("disabled", "false");
    }
    return false;

}



formRecovery();

/* bouton commander */

const commandButton = document.getElementById("order");

commandButton.addEventListener("click", (e) => {

    e.preventDefault();
    console.log("click confirmation");

    if (!isFormValid()) {
        alert("formulaire invalide")
    } else {
        if (!local) {
            alert(
                "Panier vide, veuillez sélectionner un ou plusieurs articles pour passer commande"
            );
        }
        let productId = [];
        for (let i = 0; i < local.length; i++) {
            productId.push(local[i]._id);
        }
        console.log(productId);

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
            method: "POST",
            body: JSON.stringify(commandOrder),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        };
        /* Appel de l'API pour post les informations order */
        fetch("http://localhost:3000/api/products/order", postOptions)

            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const orderId = data.orderId;
                console.log(orderId);
                // redirection vers la page confirmation
                window.location.href = "confirmation.html" + "?orderId=" + orderId;
            })

            .catch((error) => {
                alert(error);
            });
    }


});