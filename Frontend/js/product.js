let url = 'http://localhost:3000/api/teddies';

//récupération du paramètre de l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("given_id");
console.log(productId);

//Récupération de des objets
fetch(url, {method : 'GET'})
.then(data => {
	return data.json()
}).then(articles =>{
	console.log(articles)

	let HTML = document.getElementById("object")

	let newHTML = ""

	


	let a = 0

	for (i = 0; i < 1 ; a++) {
		console.log(a)
		if (articles[a]._id == productId) {
			console.log(articles[a]._id)
		  	console.log(true)
		  	i = 1

		  	let newPrice = articles[a].price /100
		  	console.log(articles[a])
		  	myHTML = `<img src="${articles[a].imageUrl}" alt="Ours en peluche">

						<!--content-->
						<form id="description">
							<div class="desc-product">
								<div>
									<h2>${articles[a].name}</h2>
									<p>${newPrice}€</p>
								</div>
								<!--dropdown list-->
								<label for="varnished">Choisissez la couleur</label>
								<select name="varnished" id="varnished">
									<option value="one">Verni1</option>
									<option value="two">Verni2</option>
									<option value="three">Verni3</option>
								</select>
							</div>

							<p>${articles[a].description}</p>

							<!--Submit Button-->
							<button type="submit" onclick="">Ajouter au Panier</button>
						</form>`

		}else{
		  	console.log(articles[a]._id)
		  	console.log(false)
		}
	}
	

	console.log(myHTML)
	HTML.innerHTML = myHTML
})