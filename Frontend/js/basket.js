//Basket recovery
const basket = JSON.parse(localStorage.getItem('basket'))
console.log(basket)

//Code replacement variable
let HTML = document.getElementById("ordered_articles")
let myHTML = ""

let totalPrice = document.getElementById("total_price")
let newTotalPrice = 0

//Appearance of items and their total price
basket.forEach(article_order =>{
	
	//Price modification
	let originalPrice = article_order.price /100
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

  	//HTML modification
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

//Initialization of variables
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

//ReExp
let lettersNumbersRg = /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]+$/
let lettersRg = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/
let emailRg = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/

//Functions
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
	return validation(regex, eltValue)
}

//Checking the inputs when the page appears
firstNameValid = validationStatus(firstName, lettersRg)
lastNameValid = validationStatus(lastName, lettersRg)
emailValid = validationStatus(email, emailRg)
addressValid = validationStatus(address, lettersNumbersRg)
cityValid = validationStatus(city, lettersNumbersRg)
disable()

//Verification of inputs during changes
firstName.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	firstNameValid = validation(lettersRg, inputValue)
	disable()
	message("Seuls les lettres sont acceptés", firstNameValid)
})

lastName.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	lastNameValid = validation(lettersRg, inputValue)
	disable()
	message("Seuls les lettres sont acceptés", lastNameValid)
})

email.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	emailValid = validation(emailRg, inputValue)
	disable()
	message("Le format n'est pas valide", emailValid)
})

address.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	addressValid = validation(lettersNumbersRg, inputValue)
	disable()
	message("Seuls les lettres et les chiffres sont acceptés", addressValid)
})

city.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	cityValid = validation(lettersNumbersRg, inputValue)
	disable()
	message("Seuls les lettres et les chiffres sont acceptés", cityValid)
})



//Button clicked
const form = document.querySelector('form');
let url = "http://localhost:3000/api/teddies/order"
form.addEventListener("submit", event => {
	event.preventDefault()
	console.log("click OK")

	//Contact recovery
	let contact = {
		firstName : document.getElementById('firstName').value,
		lastName : document.getElementById('lastName').value,
		email : document.getElementById('email').value,
		address : document.getElementById('address').value,
		city : document.getElementById('city').value,
	}

	//Products ID recovery
	let products = []
	basket.forEach(product => {
		products.push(product.id)
	})

	//Compilation
	const request = {
		contact : contact,
		products : products,
	}
	console.log(request)

	//Send to http://localhost:3000/api/teddies/order
	const options = {
	    method: 'POST',
	    body: JSON.stringify(request),
	    headers: {
	        'Content-Type': 'application/json'
	    }
	}

	fetch(url, options)
    .then(res => res.json())
    .then(res => {
    	let order = JSON.stringify(res)
    	localStorage.setItem('order', order)
    	console.log(localStorage)

    	//Redirection
    	window.location.href = 'confirmation.html';
    })
    .catch(function(error) {
	  alert('Impossible d\'envoyer la requête');
	})
})