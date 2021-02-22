//Récupération du panier
const basket = JSON.parse(localStorage.getItem('basket'))
console.log(basket)

//Variable de remplacement de code
let HTML = document.getElementById("ordered_articles")
let myHTML = ""

let totalPrice = document.getElementById("total_price")
let newTotalPrice = 0

basket.forEach(article_order =>{
	
	//modification du prix
	let originalPrice = article_order.price /100
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

  	//Modification du HTMl
  	myHTML += `<div class="ordered_article">
				<img src="${article_order.imageUrl}" alt="Ours en peluche">
				<div>
					<div>
						<h3>${article_order.name}</h3>
						<p>${article_order.color}</p>
					</div>
					<p>${newPrice}</p>
				</div>
			</div>`

	newTotalPrice =  newTotalPrice + article_order.price

	HTML.innerHTML = myHTML
	totalPrice.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(newTotalPrice/100)

})




/*

let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let address = document.getElementById('address')
let city = document.getElementById('city')
const btnOrder = document.getElementById("order")

let firstNameValid = ""
let lastNameValid = ""
let emailValid = ""
let addressValid = ""
let cityValid = ""

// function validation (finalValue, elt, validValue) {
// 	let regexValide = finalValue.test(elt);
// 	console.log(regexValide)

// 	if (regexValide){
// 		validValue = true

// 	}else{
// 		validValue = false
// 	}

// 	if (firstNameValid && lastNameValid && emailValid && addressValid && cityValid) {
// 	btnOrder.removeAttribute("disabled")
// 	}else{
// 		btnOrder.removeAttribute("disabled")
// 		btnOrder.setAttribute("disabled", "disabled")
// 	}
// }

function validation (finalValue, elt) {
	let regexValide = finalValue.test(elt);
	console.log(regexValide)

	if (regexValide){
		return true

	}else{
		return = false
	}
}

// function disable


firstName.addEventListener('input', (event) =>{
	let inputValue = event.target.value
	firstNameValid = validation(/^[a-zA-Z -]+$/, inputValue, firstNameValid)
	console.log(firstNameValid)
})

lastName.addEventListener('input', (event) =>{
	let inputValue = event.target.value
	validation(/^[a-zA-Z -]+$/, inputValue, lastNameValid)
})

email.addEventListener('input', (event) =>{
	let inputValue = event.target.value
	validation(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/, inputValue, emailValid)
})

address.addEventListener('input', (event) =>{
	let inputValue = event.target.value
	validation(/^[0-9a-zA-Z -]+$/, inputValue,addressValid)
})

city.addEventListener('input', (event) =>{
	let inputValue = event.target.value
	validation(/^[a-zA-Z -]+$/, inputValue, cityValid)
})

// console.log(firstNameValid)
// console.log(lastNameValid)
// console.log(emailValid)
// console.log(addressValid)
// console.log(cityValid)



//Bouton cliqué
/*let btnOrder = document.getElementById("order")
console.log(btnOrder)
btnOrder.addEventListener("click", event => {
	console.log("click OK")

//Vérification du contact
//les inputs
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let address = document.getElementById('address')
let city = document.getElementById('city')

//Les fonctions
	//Vérification du prénom
	//#^[a-z]$#

	//Vérification du nom
	//#^[a-z]$#

	//vérification du Email avec des expressions régulières
	//#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#


//récupération du contact


//Récupération des produits


//Envois au http://localhost:3000/api/teddies/order


//Redirection -> confirmation.html
})*/