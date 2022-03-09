/* Creation d'un tableau vide */
let lesCanaps = [];

/* Recuperation de la liste des produits  dans l'API et les ajoute au tableau lesCanaps */
const fetchCanaps = async () => {
    await fetch("http://localhost:3000/api/products/")
        .then((res) => res.json())
        .then((promise) => {
            lesCanaps = promise;
            console.log(lesCanaps);
        });
};
/* affiche les différents produits dans le DOM */ 
const displayCanaps = async () => {
    await fetchCanaps();
    document.getElementById("items").innerHTML = lesCanaps.map((products) => `
    <a href = "${products._id}">
        <article>
            <img src="${products.imageUrl}" alt="${products.altTxt}">
            <h3 class="productName">"${products.name}"</h3>
            <p class="productDescription">"${products.description}"</p>
        </article>
    </a>
    `)
};

displayCanaps();