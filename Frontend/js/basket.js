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

//Initialisation des variables
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let address = document.getElementById('address')
let city = document.getElementById('city')
let btnOrder = document.getElementById("order")

let firstNameValid = ""
let lastNameValid = ""
let emailValid = ""
let addressValid = ""
let cityValid = ""

//Fonction
function validation (regex, elt) {
	let regexValide = regex.test(elt);

	if (regexValide){
		return true

	}else{
		return false
	}
}

function disable(){
	btnOrder.removeAttribute("disabled")
	if (!firstNameValid || !lastNameValid || !emailValid || !addressValid || !cityValid) {
		btnOrder.setAttribute("disabled", "disabled")
 	}
}

function message(message, eltValid){
	if (eltValid != true && message) {
		alert(message)
	}
}

function validationStatus(inputElt, regex){
	let eltValue = inputElt.value
	console.log(eltValue)
	return validation(regex, eltValue)
}

//Vérification des intputs à l'apparission de la page
firstNameValid = validationStatus(firstName, /^[a-zA-Z -]+$/)
lastNameValid = validationStatus(lastName, /^[a-zA-Z -]+$/)
emailValid = validationStatus(email, /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
addressValid = validationStatus(address, /^[0-9a-zA-Z -]+$/)
cityValid = validationStatus(city, /^[a-zA-Z -]+$/)
disable()

//Vérification des inputs aux changements
firstName.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	firstNameValid = validation(/^[a-zA-Z -]+$/, inputValue)
	disable()
	message("Seuls les lettres sont acceptés", firstNameValid)
})

lastName.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	lastNameValid = validation(/^[a-zA-Z -]+$/, inputValue)
	disable()
	message("Seuls les lettres sont acceptés", lastNameValid)
})

email.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	emailValid = validation(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/, inputValue)
	disable()
	message("Le format n'est pas valide", emailValid)
})

address.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	addressValid = validation(/^[0-9a-zA-Z -]+$/, inputValue)
	disable()
	message("Seuls les lettres et les chiffres sont acceptés", addressValid)
})

city.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	cityValid = validation(/^[0-9a-zA-Z -]+$/, inputValue)
	disable()
	message("Seuls les lettres et les chiffres sont acceptés", cityValid)
})



//Bouton cliqué
/*console.log(btnOrder)
btnOrder.addEventListener("click", event => {
	console.log("click OK")

//récupération du contact


//Récupération des produits


//Envois au http://localhost:3000/api/teddies/order


//Redirection -> confirmation.html
})*/