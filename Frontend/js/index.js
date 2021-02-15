let url = 'http://localhost:3000/api/teddies' 

//Récupération des objets
fetch(url, {method : 'GET'})
.then(data => {
	return data.json()

//Objets en Json
}).then(products =>{
	console.log(products)

	//Variable de remplacement de code
	let HTML = document.getElementById("products")

	let myHTML = ""

	//Ajout des produits
	products.forEach(product =>{
		console.log(product.name)
		console.log(product.price)

		//modification du prix
		let originalPrice = product.price /100
  		let newPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(originalPrice)

		//Modification du HTMl
		myHTML += `<figure>
						<img src="${product.imageUrl}" alt="${product.name}">
						<figcaption>
							<h2>${product.name}</h2>
							<p>${newPrice}</p>
							<a href="product.html?given_id=${product._id}">Voir le produit</a>
						</figcaption>
					</figure>`
	}) 

	console.log(myHTML)
	HTML.innerHTML = myHTML
})