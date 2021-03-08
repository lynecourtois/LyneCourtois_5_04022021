//retrieving the URL parameter
const urlParams = new URLSearchParams(window.location.search) 
const productId = urlParams.get("given_id") 
console.log(productId) 

//Url initialisation
let url = `http://localhost:3000/api/teddies/${productId}` 


//Product recovery
fetch(url, {method : 'GET'})
.then(data => {
	return data.json()

//Objects to Json
}).then(article =>{
	console.log(article)

	//Code replacement variable
	let HTML = document.getElementById("object")

	let newHTML = ""

	///Price modification
	let originalPrice = article.price /100
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

  	//HTML modification
  	myHTML = `<img src="${article.imageUrl}">
				<!--content-->
				<form id="description">
					<div class="desc-product">
						<div>
							<h2>${article.name}</h2>
							<p>${newPrice}</p>
						</div>

						<div>
							<!--dropdown list-->
							<label for="color">Choisissez la couleur</label><br>
							<select name="color" id="color">
							</select>
						</div>
					</div>

					<p>${article.description}</p>

					<!--Submit Button-->
					<button id="addtobasket" type="submit">Ajouter au Panier</button>
				</form>`

	HTML.innerHTML = myHTML



	//Options modification
	//Code replacement variable
	let option = document.getElementById("color")
	let newoption = ""

	console.log(article.colors)

	//Options initialisation
	article.colors.forEach(optionColor =>{
		console.log(optionColor)
		newoption += `<option value="${optionColor}">${optionColor}</option>`
	}) 

	console.log(newoption)

	option.innerHTML = newoption


	//Form selection
	const form = document.querySelector('form');
	console.log(form)
	console.log(localStorage)

	//Reaction on click
	form.addEventListener("submit", event => {
		event.preventDefault()
		let selectColor = event.target.color.value

		console.log(selectColor)
		console.log("click OK")

		//Array
		let basketObject = {
			id : article._id,
			imageUrl : article.imageUrl,
			name : article.name,
			price : article.price,
			color : selectColor,
		}

		//The condition of the empty basket is True
		if (localStorage.length == 0) {
			console.log("rien dans le panier")

			//Object added to basket
			let newBasketObjects = []
			newBasketObjects.push(basketObject);

			//Object transformed from JSON
			let basketProducts = JSON.stringify(newBasketObjects)

			//LocalStorage created with the object
			localStorage.setItem('basket', basketProducts)

		//The condition of the empty basket is False
		}else{
			console.log("Panier déjà rempli")

			//Basket retrieved and transformed into JSON
			let oldBasket = localStorage.getItem('basket')

			let newBasketObjects = JSON.parse(oldBasket)

			//Object added to basket
			newBasketObjects.push(basketObject);
			console.log(newBasketObjects)


			let basketProducts = JSON.stringify(newBasketObjects)
			console.log(basketProducts)

			//LocalStorage added
			localStorage.setItem('basket', basketProducts)
		}

		alert('article ajouté au panier')
	})
})