function getProductId() {
	return new URL(location.href).searchParams.get("id");
}
const productId = getProductId();
console.log(productId);

var theProduct = [];

const fetchProduct = async () => {
	await fetch(`http://localhost:3000/api/products/${productId}`)
		.then((res) => res.json())
		.then((promise) => {
			theProduct = promise;
			console.log(theProduct);
		});
};

const displayProduct = async () => {
    await fetchProduct();
	theProduct.colors.forEach(element => console.log(element))
	
    document.getElementById("item_card").innerHTML =  `
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
                    <option value=""></option>
                    
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
           
          </article>


	
    `


};
displayProduct();
