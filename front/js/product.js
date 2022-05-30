const test = "test";
/* recuperation du parametre id dans l'url */


function getProductId() {
    return new URL(location.href).searchParams.get("id");
}
const productId = getProductId();
console.log(productId);

/* recuperation du produit dans l'API par son id et ajoute ses informations dans theProduct */
var theProduct = [];
const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((promise) => {
            theProduct = promise;
            console.log(theProduct);
            console.log(test)
        });
};

/* affiche les caracteristiques du produit dans le DOM */
const displayProduct = async () => {
    await fetchProduct();
    theProduct.colors.forEach(element => console.log(element))

    document.getElementById("item_card").innerHTML = `
    <article>
             <div class="item__img">
               <img src="${theProduct.imageUrl}" alt="${theProduct.altTxt}"> 
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${theProduct.name}</h1>
                <p>Prix : <span id="price">${theProduct.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${theProduct.description} </p>
              </div> 
			  
               <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                    <option value="">--SVP, choisissez une couleur --</option>                    
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="${theProduct._id}">Ajouter au panier</button>
              </div>

            </div>
           
    </article>
    `

    /* recuperation des couleurs possibles du produit et creer un element option pour chaque couleur dans le DOM */
    let colorSelect = document.getElementById("colors");
    console.log(colorSelect);

    theProduct.colors.forEach((eachColors) => {

        let tagOption = document.createElement("option");
        tagOption.innerHTML = `${eachColors}`;
        tagOption.value = `${eachColors}`;

        colorSelect.appendChild(tagOption);

    });
    addProductToStorage();
};

displayProduct();


const addProductToStorage = () => {
    let bouton = document.getElementById(theProduct._id);
    console.log(bouton);
    bouton.addEventListener("click", () => {
        let productTable = JSON.parse(localStorage.getItem("product"));
        let colorSelection = document.getElementById("colors").value;
        let itemQuantity = parseInt(document.getElementById("quantity").value);
        console.log(itemQuantity)


        const addColorAndQuantity = Object.assign({}, {
            color: colorSelection,
            quantity: itemQuantity,
            _id: productId
        })

        if (productTable == null) {
            console.log("productTable = null")
            productTable = []
            productTable.push(addColorAndQuantity);
            console.log(productTable);
            localStorage.setItem("product", JSON.stringify(productTable));
        } else if (productTable != null) {
            console.log("productTable != null", productTable)
            /* condition meme produit,meme couleur */
            for (i = 0; i < productTable.length; i++) {
                if (productTable[i]._id == theProduct._id && productTable[i].color == colorSelection) {
                    console.log("meme produit,meme couleur")
                    return (
                        productTable[i].quantity += itemQuantity,
                        localStorage.setItem("product", JSON.stringify(productTable)),
                        productTable = JSON.parse(localStorage.getItem("product"))
                    );
                }
            }
            /* condition couleur differente ou produit different */
            for (i = 0; i < productTable.length; i++) {
                if (
                    (productTable[i]._id == theProduct._id && productTable[i].color != colorSelection) || (productTable[i]._id != theProduct._id)
                ) {
                    return (console.log("couleur ou produit différent"),
                        productTable.push(addColorAndQuantity),
                        localStorage.setItem('product', JSON.stringify(productTable)),
                        productTable = JSON.parse(localStorage.getItem('product'))
                    );
                }
            }
        }
    });
    return (productTable = JSON.parse(localStorage.getItem("product")));
};