let url = 'http://localhost:3000/api/teddies';


fetch(url, {method : 'GET'})
.then(data => {
	return data.json()
}).then(products =>{
	console.log(products)

	let HTML = document.getElementById("products")

	let myHTML = ""
	products.forEach(product =>{
		console.log(product.name)
		console.log(product.price)
		let newPrice = product.price /100
		console.log(newPrice)
		myHTML += `<figure>
						<img src="${product.imageUrl}" alt="${product.name}">
						<figcaption>
							<h2>${product.name}</h2>
							<p>${newPrice}€</p>
							<a href="product.html?id_product=${product._id}">Voir le produit</a>
						</figcaption>
					</figure>`
	});

	console.log(myHTML)
	HTML.innerHTML = myHTML
})