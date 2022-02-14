//multipleCheckboxes serve para valores marcados no dietType e healthInfo, já que ambos são vários checkboxes; 
//valorClass deve ser a classe ex: .dietType e .healthInfo; dietOrHealth é diet ou health;

//colocar função acima em eventos dos buttons, se for usar button

//função com parametro para nameInput => cuisineType, mealType e dishType: 

const radioValuesLocalStorage = (nameInput) => {
	const inputValue = document.querySelector(`input[name=${nameInput}]:checked`).value;
	userPreferences.push(`&${nameInput}=${inputValue}`);
};

//isso será colocado no script.js junto com as demais, na ordem apropriada

//função para extrair a primeira receita do objeto de resposta
const extractRecipe = (data) => {
	const { hits } = data;
	const { recipe } = hits[0];
	return recipe;  
};

// Acredito que a função antiga (appendImg) possa ser reutilizada para outro caso, visto que o elemento da imagem já existe e, para adicionar a imagem, é só colocar o link em src - CRIAÇÃO DA SELECTORSORTER para auxiliar 
function selectorSorter(category, tag) {
	if (category === 'food') return document.querySelector(`#${tag}`);
	if (category === 'drink') return document.querySelector(`#drink-${tag}`);
	if (category === 'search') return document.querySelector(`#search-${tag}`);
}

function removeEveryChild(object) { 
	object.innerHTML = '';
}

function addAllTags(dietLabels, healthLabels, cautions, category) {
	const tagsParent = document.getElementById(`tags${category}`);
	removeEveryChild(tagsParent);

	const allLabels = [...dietLabels, ...healthLabels, ...cautions];
	allLabels.forEach((label) => {
		const span = document.createElement('span');
		span.innerText = label;
		span.className = 'tag';
		tagsParent.appendChild(span);
	});
}

//arg category poderá ser 'food', 'drink' ou 'search'
function tableValuesRefresh(category, nutrients, daily, servings) {
	const standardDataIds = ['-calories-data', '-carbs-data', '-proteins-data', '-saturatedfat-data', '-transfat-data', '-totalfat-data', '-totalfiber-data', '-sodium-data'];
	const standardPercentIds = ['-calories-percent', '-carbs-percent', '-proteins-percent', '-saturatedfat-percent', '-transfat-percent', '-totalfat-percent', '-totalfiber-percent', '-sodium-percent'];
	const standardKeys = ['ENERC_KCAL', 'CHOCDF', 'PROCNT', 'FASAT', 'FATRN', 'FAT', 'FIBTG', 'NA'];

	standardDataIds.forEach((id, index) => document.getElementById(`${category}${id}`).innerText = Math.floor(nutrients[standardKeys[index]].quantity / servings));

	standardPercentIds.forEach((id, index) => {
		if (!daily[standardKeys[index]]) {
			document.getElementById(`${category}${id}`).innerText = 0;
		} else {
			document.getElementById(`${category}${id}`).innerText = Math.floor(daily[standardKeys[index]].quantity / servings);
		}
	});
}

// função que altera o innerText de elementos
function innerTxtChanger(category, id, text) {
	const changedElement = selectorSorter(category, id); 
	changedElement.innerText = text;
}

//Alterações para que seja uma função mais genérica, para ser adicionada à função que será chamada no listener de cada uma das categorias
function generateRecipe (data, category) {
	const { label, image, images, source, url, yield: servings, dietLabels, healthLabels, cautions, ingredientLines, totalTime, totalNutrients, totalDaily } = extractRecipe(data);

	tableValuesRefresh(category, totalNutrients, totalDaily, servings);
	
	const imgContainer = selectorSorter(category, 'recipe-img');
	imgContainer.src = image;

	innerTxtChanger(category, 'recipe-title', label);
	innerTxtChanger(category, 'prepar-time', totalTime);
	innerTxtChanger(category, 'recipe-ingredients-number', (ingredientLines.length - 1));
	innerTxtChanger(category, 'servings-number', servings);
	
	// Requer revisão, pois não sei se a linha 104 funciona
	//const instructionsBtn = selectorSorter(category, 'recipe-btn-instructions');
	//instructionsBtn.onclick = window.location.href=url;
	
	//const instructionsSource = instructionsBtn.nextElementSibling;
	//instructionsSource.href = url;
	//instructionsSource.innerText = `on ${source}`;
	const splitUrl = url.split('/');
	const baseUrl = splitUrl[0] + '//' + splitUrl[2];
	if (category !== 'drink') {
		document.getElementById('linkFood').href = url;
		document.getElementById('foodSource').href = baseUrl;
		document.getElementById('foodSource').innerText = `on ${source}`;

		addAllTags(dietLabels, healthLabels, cautions, '');
		const recipeIngredients = document.getElementById('recipe-ingredients'); 
		while (recipeIngredients.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling) {
			recipeIngredients.removeChild(recipeIngredients.lastChild);
		}
		ingredientLines.forEach((each) => {
			const li = document.createElement('li');
			li.innerText = each;
			recipeIngredients.appendChild(li);
		});
	}
	if (category === 'drink') {
		document.getElementById('linkDrink').href = url;
		document.getElementById('drinkSource').href = baseUrl;
		document.getElementById('drinkSource').innerText = `on ${source}`;
		addAllTags(dietLabels, healthLabels, cautions, category);
		const recipeIngredients = document.getElementById('drink-recipe-ingredients'); 
		while (recipeIngredients.firstElementChild.nextElementSibling.	nextElementSibling.nextElementSibling) {
		recipeIngredients.removeChild(recipeIngredients.lastChild);
		}
		ingredientLines.forEach((each) => {
			const li = document.createElement('li');
			li.innerText = each;
			recipeIngredients.appendChild(li);
		});
	}
}

// função que será usada como listener para food, search e drink
// sei que já existe uma listener para o efeito na branch de front-end (changeTab), então seria interessante colocar essa função aqui dentro
async function categoryBtnClicker(category) {
	const storedArray = JSON.parse(localStorage.getItem('userPreferences'));
	let data;
	if (category === 'food') data = await fetchFoodRecipes(storedArray);
	if (category === 'drink') data = await fetchDrinkRecipes(storedArray);
	if (category === 'search') data = await fetchSearchRecipes(storedArray);
	generateRecipe(data, category);
}

// ------------ INTERFACE START ------------

// icons selectors

const foodIcon = document.querySelector('#food-icon');
const drinkIcon = document.querySelector('#drink-icon');
const refreshIcon = document.querySelector('#refresh-icon');
const settingsIcon = document.querySelector('#setttings-icon');

// loading screen selector

const loadingScreen = document.querySelector('#loading');

// tabs selectors

const navbar = document.querySelector('#navbar');
const allTabs = document.querySelector('#main-container');
const tabFood = document.querySelector('#recipe-container');
const tabDrink = document.querySelector('#drink-container');

// modal selectors

const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal-close');
const resetSettingsButton = document.querySelector('#btn-reset-settings');

// form selectors

const formContainer = document.querySelector('#forms');
const form = document.querySelector('#preferences-form');
const questionsArray = [...form.children];
const nextButtons = document.querySelectorAll('.is-success');

// functions

const changeTab = (element, button) => {
	const previousButton = document.querySelector('.selected');
	if (previousButton) previousButton.classList.remove('selected');
	button.classList.add('selected');
	const previousElement = document.querySelector('.visible');
	if (previousElement) {
		previousElement.classList.remove('visible');
		previousElement.classList.add('invisible');
	}
	element.classList.remove('invisible');
	element.classList.add('visible');
};

const displayModal = (element, button) => {
	const previousButton = document.querySelector('.selected');
	if (previousButton) previousButton.classList.remove('selected');
	button.classList.add('selected');
	element.classList.add('is-active');
};

foodIcon.addEventListener('click', () => changeTab(tabFood, foodIcon));
drinkIcon.addEventListener('click', () => changeTab(tabDrink, drinkIcon));
settingsIcon.addEventListener('click', () => displayModal(modal, settingsIcon));
refreshIcon.addEventListener('click', () => window.location.reload());

modalCloseButton.addEventListener('click', () => modal.classList.remove('is-active'));
resetSettingsButton.addEventListener('click', () => {
	localStorage.clear();
	window.location.reload();
});

const displayElement = (element) => {
	element.classList.remove('hidden');
	element.classList.add('display');
};

{/* <p class="speech-bubble hidden">Hi, Fulano, how are you doing?</p> */}

const userPreferences = [];

const multipleCheckboxes = (valorClass) => {
	let answer = '';
	[...document.getElementsByClassName(valorClass)].forEach((each) => {
		console.log(each.value);
		if (each.checked) {
			answer += `&Health=${each.value}`;
		}});
	userPreferences.push(answer);
};

const addSearchSession = (input) => {
	const searchElement = encodeURIComponent(input.value);
	sessionStorage.setItem('searchElement', searchElement);
};

// const formButtonsListeners = (question) => {
// 	[...document.querySelectorAll('.btn-start-over')]
// 	.forEach((button) => {
// 		button.addEventListener('click', () => {
// 			localStorage.clear();
// 			window.location.reload();
// 		});
// 	});
// 	if (question === 'question-1') {
// 		document.getElementById('btn-username')
// 		.addEventListener('click', () => {
// 			const username = document.getElementById('username');
// 			localStorage.setItem('name', username.value);
// 		});
// 	}
// 	if (question === 'question-2') {
// 		document.getElementById('btn-restriction')
// 		.addEventListener('click', () => {
// 			multipleCheckboxes('checkbox');
// 			localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
// 		});
// 	}
// 	if (question === 'question-3') {
// 	document.getElementById('btn-ingredients')
// 		.addEventListener('click', () => {
// 			addSearchSession(document.getElementById('ingredients'));
// 		});
// 	}
// }

[...document.querySelectorAll('.btn-start-over')]
.forEach((button) => {
	button.addEventListener('click', () => {
		localStorage.clear();
		window.location.reload();
	});
});
	document.getElementById('btn-username')
	.addEventListener('click', () => {
		const username = document.getElementById('username');
		localStorage.setItem('name', username.value);
	});
	document.getElementById('btn-restriction')
	.addEventListener('click', () => {
		multipleCheckboxes('checkbox');
		localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
	});
document.getElementById('btn-ingredients')
	.addEventListener('click', () => {
		addSearchSession(document.getElementById('ingredients'));
	});

const conversationFlow = async (question) => {
	question.style.height = 'fit-content';
	[...question.children].forEach((currentBubble, index) => {
		let delay = 1 * (index +1);
		currentBubble.style.transitionDelay = `${delay}s`;
		currentBubble.style.display = 'block';
		displayElement(currentBubble);
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	});
	if (question.id === 'question-5') {
		setTimeout(async () => {
			formContainer.style.display = 'none';
			navbar.style.display = 'flex';
			allTabs.style.display = 'flex';
			await categoryBtnClicker('food');
			await categoryBtnClicker('drink');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 4000);
	}
};

nextButtons.forEach((currentButton) => {
	currentButton.addEventListener('click', (event) => {
		event.preventDefault();
		const currentInputGroup = currentButton.parentElement.parentElement;
		conversationFlow(currentInputGroup.parentElement.nextElementSibling);
		currentInputGroup.remove();
	});
});

const startLoading = () => {
	loadingScreen.style.display = 'flex';
};

const stopLoading = () => {
	loadingScreen.style.display = 'none';
};

// ------------ INTERFACE END ------------

window.onload = async () => {
	startLoading();
	setTimeout(() => {
		stopLoading();
	}, 1500);
	if (!localStorage.getItem('name') || !localStorage.getItem('userPreferences')) {
		navbar.style.display = 'none';
		allTabs.style.display = 'none';
		conversationFlow(questionsArray[0]);
	} else {
		navbar.style.display = 'none';
		allTabs.style.display = 'none';
		conversationFlow(questionsArray[2]);
    await categoryBtnClicker('food');
    await categoryBtnClicker('drink');
  }
};
