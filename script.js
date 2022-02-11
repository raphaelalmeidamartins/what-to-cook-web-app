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


const nutrientsObj = (ingredients) => {
	const usedKeys = ['ENERC_KCAL', 'FAT', 'CHOCDF', 'PROCNT', 'CHOLE', 'NA'];
	const objects = [];
	Object.keys(ingredients).forEach((each) => {
		if (usedKeys.includes(each)) {
			objects.push(ingredients[each]);
		}
	})
	return objects;
}

function appendImg(parent) {
	const divImgContainer = document.createElement('div');
  
	const img = document.createElement('img');
  
	divImgContainer 
	img.src = image;
	
	divImgContainer.appendChild(img);
	parent.appendChild(divImgContainer);
}


window.onload = async () => {
  buttonSearch.addEventListener('click', addSearchLocal);
};
