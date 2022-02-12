const buttonSearch = document.getElementById('addSearch');
const inputSearch = document.getElementById('searchElement');

const localStorageArray = [];

const addSearchLocal = () => {
	const searchElement = encodeURIComponent(inputSearch.value);
	localStorage.setItem('searchElement', searchElement);
};

//multipleCheckboxes serve para valores marcados no dietType e healthInfo, já que ambos são vários checkboxes; 
//valorClass deve ser a classe ex: .dietType e .healthInfo; dietOrHealth é diet ou health;

const multipleCheckboxes = (valorClass, dietOrHealth) => {
	let answer = '';
	Array.from(document.querySelectorAll(valorClass)).forEach((each) => {
		if (each.checked) {
			answer = `&${dietOrHealth}=` + each.value;
		}});
	localStorageArray.push(answer);
};
//colocar função acima em eventos dos buttons, se for usar button

//função com parametro para nameInput => cuisineType, mealType e dishType: 

const radioValuesLocalStorage = (nameInput) => {
	const inputValue = document.querySelector(`input[name=${nameInput}]:checked`).value;
	localStorageArray.push(`&${nameInput}=${inputValue}`);
};

//isso será colocado no script.js junto com as demais, na ordem apropriada
localStorage.setItem('otherElements', JSON.stringify(localStorageArray));

//estrutura da url global: const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchElement}&app_id=7c7cd4bd&app_key=545204c90ab3de54ab8d84cd5aaba9dc&diet=${dietType}&health=${healthInfo}&health=${healthInfo}&cuisineType=${cuisineType}&mealType=${mealType}&dishType=${dishType}&calories=${caloriesDropdown}&random=true`; 
//Função para gerar URL :

//função para extrair a primeira receita do objeto de resposta
const extractRecipe = (data) => {
	const { hits } = data;
	const { recipe } = hits[0];
	return recipe;  
};

//função para extrair as informações de recipe

const data = await fetchRecipes();

const { label, image, images, source, url, yield, dietLabels, healthLabels, cautions, ingredientLines, calories, totalWeight, totalTime, cuisineType, mealType, dishType, totalNutrients, totalDaily } = extractRecipe(data);


function appendImg(parent) {
	const divImgContainer = document.createElement('div');
	parent.firstChild.remove()
	const img = document.createElement('img');
  	
	img.src = image;
	img.id = 'recipe-img'

	divImgContainer.appendChild(img);
	parent.appendChild(divImgContainer);
}

function removeEveryChild(object) { 
	while (object.firstChild) {
		object.removeChild(object.lastChild);
	}
}

function addAllTags() {
	const tagParents = document.getElementById('tags')
	removeEveryChild(tagParents);

	const allLabels = [];
	allLabels.push(...dietLabels);
	allLabels.push(...healthLabels);
	allLabels.push(...cautions);
	allLabels.forEach((each) => {
		const span = document.createElement('span');
		span.innerText = each;
		span.className = 'tag'
		tagParents.appendChild(span);
	})
}

function tableValuesRefresh() {
	document.getElementById('food-calories-data').innerText = Math.floor(totalNutrients.ENERC_KCAL.quantity / yield);
	document.getElementById('food-carbs-data').innerText = Math.floor(totalNutrients.CHOCDF.quantity / yield);
	document.getElementById('food-proteins-data').innerText = Math.floor(totalNutrients.PROCNT.quantity / yield);
	document.getElementById('food-saturatedfat-data').innerText = Math.floor(totalNutrients.FASAT.quantity / yield);
	document.getElementById('food-transfat-data').innerText = Math.floor(totalNutrients.FATRN.quantity / yield);
	document.getElementById('food-totalfat-data').innerText = Math.floor(totalNutrients.FAT.quantity / yield);
	document.getElementById('food-totalfiber-data').innerText = Math.floor(totalNutrients.FIBTG.quantity / yield);
	document.getElementById('food-sodium-data').innerText = Math.floor(totalNutrients.NA.quantity / yield);

	
	document.getElementById('food-calories-percent').innerText = Math.floor(totalDaily.ENERC_KCAL.quantity / yield);
	document.getElementById('food-carbs-percent').innerText = Math.floor(totalDaily.CHOCDF.quantity / yield);
	document.getElementById('food-proteins-percent').innerText = Math.floor(totalDaily.PROCNT.quantity / yield);
	document.getElementById('food-saturatedfat-percent').innerText = Math.floor(totalDaily.FASAT.quantity / yield);
	document.getElementById('food-transfat-percent').innerText = 0;
	document.getElementById('food-totalfat-percent').innerText = Math.floor(totalDaily.FAT.quantity / yield);
	document.getElementById('food-totalfiber-percent').innerText = Math.floor(totalDaily.FIBTG.quantity / yield);
	document.getElementById('food-sodium-percent').innerText = Math.floor(totalDaily.NA.quantity / yield);
} 

 async function generateRecipe  () {
	addAllTags();
	tableValuesRefresh();
	
	const imgContainer = document.querySelector('.image');
	appendImg(imgContainer);
	const recipeTitle = document.getElementById('recipe-title'); 
	recipeTitle.innerText = label;

	document.getElementById('recipe-ingredients-number').innerText = ingredientLines.length -1 ;
	
	document.getElementById('servings-number').innerText = yield;

	const recipeIngredients = document.getElementById('recipe-ingredients'); 
	//deleta todos menos o h3 no ul
	while (recipeIngredients.firstElementChild.nextElementSibling.nextElementSibling) {
		recipeIngredients.removeChild(recipeIngredients.lastChild);
	}
	ingredientLines.forEach((each) => {
		const li = document.createElement('li');
		li.innerText = each;
		recipeIngredients.appendChild(li);
	})
}

window.onload = async () => {
  buttonSearch.addEventListener('click', addSearchLocal);
};
