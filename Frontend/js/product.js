//récupération du paramètre de l'URL
const urlParams = new URLSearchParams(window.location.search) 
const productId = urlParams.get("given_id") 
console.log(productId) 


let url = `http://localhost:3000/api/teddies/${productId}` 


//Récupération des objets
fetch(url, {method : 'GET'})
.then(data => {
	return data.json()

//Objets en Json
}).then(article =>{
	console.log(article)

	//Variable de remplacement de code
	let HTML = document.getElementById("object")

	let newHTML = ""

	//modification du prix
	let originalPrice = article.price /100
  	let newPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(originalPrice)

  	//Modification du HTMl
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
					<button id="addtobasket">Ajouter au Panier</button>
				</form>`

	HTML.innerHTML = myHTML



	//Modification des options
	let option = document.getElementById("color")
	let newoption = ""

	console.log(article.colors)

	article.colors.forEach(optionColor =>{
		console.log(optionColor)
		newoption += `<option value="${optionColor}">${optionColor}</option>`
	}) 

	console.log(newoption)

	option.innerHTML = newoption





	//Sélection de la variable du bouton au panier
	let btnBasket = document.getElementById("addtobasket")
	console.log(btnBasket)
	console.log(localStorage.basket)

	//Réaction en cas de clic
	btnBasket.addEventListener("click", event => {
		event.preventDefault() 
		console.log("click OK")

		//Tableau
		let basketObject = [
			article._id,
		]
		console.log(basketObject)

		//la condition du panier vide Vrai
		if (localStorage.length == 0) {
			console.log("rien dans le panier")

			//Objet transformé en JSON
			let basketProducts = JSON.stringify(basketObject)

			//Le localStorage créé avec l'objet
			localStorage.setItem('basket', basketProducts)

		//la condition du panier vide Fausse (donc le panier est plein)
		}else{
			console.log("Panier déjà rempli")

			//Panier récupéré et transformé en JSON
			let oldBasket = localStorage.getItem('basket')

			let newBasketObjects = JSON.parse(oldBasket)


			//Object ajouté au panier
			newBasketObjects.push(article._id);


			let basketProducts = JSON.stringify(newBasketObjects)
			console.log(basketProducts)

			//LocalStorage rajouté
			localStorage.setItem('basket', basketProducts)
		}

		alert('article ajouté au panier')
		//localStorage.clear()
	})
})