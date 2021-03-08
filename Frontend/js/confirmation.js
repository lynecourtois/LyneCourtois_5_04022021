//Order recovery
const order = JSON.parse(localStorage.getItem('order'))
console.log(order)

const contact = order.contact
const products = order.products
const orderId =  order.orderId

//Code replacement variable
let HTMLOrder = document.getElementById("confirmation_text")
let myHTMLOrder = ""

let HTMLArticles = document.getElementById("purchase_articles")
let myHTMLArticles = ""

let totalPrice = document.getElementById("total_price")
let newTotalPrice = 0

//Text modification
myHTMLOrder = `<h1 class="big_title">Merci ${contact.firstName} ${contact.lastName} pour votre commande. Voici l'identifiant votre achat : <br></h1>
				<p class="purchase_id">${orderId}</p>`

HTMLOrder.innerHTML = myHTMLOrder

//Order summary
products.forEach(article_order =>{

	//Price modification
	let originalPrice = article_order.price /100
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

  	//HTML modification
  	myHTMLArticles += `<div class="ordered_article">
					<img src="${article_order.imageUrl}">
					<div>
						<p>${article_order.name}</p>
						<p>${newPrice}</p>
					</div>
				</div>`

	newTotalPrice =  newTotalPrice + article_order.price

	console.log(myHTMLArticles)
	console.log(newTotalPrice)

	HTMLArticles.innerHTML = myHTMLArticles
	totalPrice.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(newTotalPrice/100)
})

//Basket clear
localStorage.clear()