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
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

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
					<button id="addtobasket" type="submit">Ajouter au Panier</button>
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
	const form = document.querySelector('form');
	console.log(form)
	console.log(localStorage)

	//Réaction en cas de clic
	form.addEventListener("submit", event => {
		event.preventDefault()
		//console.log('Nom:', event.target.color.value)
		let selectColor = event.target.color.value

		console.log(selectColor)
		console.log("click OK")

		//Tableau
		let basketObject = {
			id : article._id,
			imageUrl : article.imageUrl,
			name : article.name,
			price : article.price,
			color : selectColor,
		}

		//la condition du panier vide Vrai
		if (localStorage.length == 0) {
			console.log("rien dans le panier")

			//Object ajouté au panier
			let newBasketObjects = []
			newBasketObjects.push(basketObject);

			//Objet transformé en JSON
			let basketProducts = JSON.stringify(newBasketObjects)

			//Le localStorage créé avec l'objet
			localStorage.setItem('basket', basketProducts)

		//la condition du panier vide Fausse (donc le panier est plein)
		}else{
			console.log("Panier déjà rempli")

			//Panier récupéré et transformé en JSON
			let oldBasket = localStorage.getItem('basket')

			let newBasketObjects = JSON.parse(oldBasket)

			//Object ajouté au panier
			newBasketObjects.push(basketObject);
			console.log(newBasketObjects)


			let basketProducts = JSON.stringify(newBasketObjects)
			console.log(basketProducts)

			//LocalStorage rajouté
			localStorage.setItem('basket', basketProducts)
		}

		alert('article ajouté au panier')
		//localStorage.clear()
	})
})