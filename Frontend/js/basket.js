//Récupération du panier
const basket = JSON.parse(localStorage.getItem('basket'))
console.log(basket)

//Variable de remplacement de code
let HTML = document.getElementById("ordered_articles")
let myHTML = ""

let totalPrice = document.getElementById("total_price")
let newTotalPrice = 0

basket.forEach(product_id =>{
	let url = `http://localhost:3000/api/teddies/${product_id}`

	//Récupération des objets
	fetch(url, {method : 'GET'})
	.then(data => {
		return data.json()

	//Objets en Json
	}).then(article_order =>{
		console.log(article_order)

		//modification du prix
		let originalPrice = article_order.price /100
	  	let newPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(originalPrice)
	  	console.log(newPrice)

	  	//Modification du HTMl
	  	myHTML += `<div class="ordered_article">
					<img src="${article_order.imageUrl}" alt="Ours en peluche">
					<div>
						<h3>${article_order.name}</h3>
						<p>${newPrice}</p>
					</div>
				</div>`
		console.log(myHTML)

		newTotalPrice =  newTotalPrice + article_order.price
		console.log(newTotalPrice)

		HTML.innerHTML = myHTML
		totalPrice.innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(newTotalPrice/100)
	
	})
})