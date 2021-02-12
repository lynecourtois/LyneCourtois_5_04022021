//récupération du paramètre de l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("given_id");
console.log(productId);


let url = `http://localhost:3000/api/teddies/${productId}`;


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
  	let newPrice = article.price /100

  	//Modification du HTMl
  	myHTML = `<img src="${article.imageUrl}">
				<!--content-->
				<form id="description">
					<div class="desc-product">
						<div>
							<h2>${article.name}</h2>
							<p>${newPrice}€</p>
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
					<button type="submit" onclick="">Ajouter au Panier</button>
				</form>`

	HTML.innerHTML = myHTML



	//Modification des options
	let option = document.getElementById("color")
	let newoption = ""

	console.log(article.colors)

	article.colors.forEach(optionColor =>{
		console.log(optionColor)
		newoption += `<option value="${optionColor}">${optionColor}</option>`
	});

	console.log(newoption)

	option.innerHTML = newoption
})