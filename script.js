const buttonSearch = document.getElementById('addSearch');
const inputSearch = document.getElementById('searchElement');

const userPreferences = [];

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
      answer = `&${dietOrHealth}=${each.value}`;
    }});
  userPreferences.push(answer);
};
//colocar função acima em eventos dos buttons, se for usar button

//função com parametro para nameInput => cuisineType, mealType e dishType: 

const radioValuesLocalStorage = (nameInput) => {
  const inputValue = document.querySelector(`input[name=${nameInput}]:checked`).value;
  userPreferences.push(`&${nameInput}=${inputValue}`);
};

//isso será colocado no script.js junto com as demais, na ordem apropriada
localStorage.setItem('userPreferences', JSON.stringify(userPreferences));

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
  while (object.firstChild) {
    object.removeChild(object.lastChild);
  }
}

function addAllTags(dietLabels, healthLabels, cautions) {
  const tagsParent = document.getElementById('tags');
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
function tableValuesRefresh(category, nutrients, daily, yield) {
  const standardDataIds = ['-calories-data', '-carbs-data', '-proteins-data', '-saturatedfat-data', '-transfat-data', '-totalfat-data', '-totalfiber-data', '-sodium-data'];
  const standardPercentIds = ['-calories-percent', '-carbs-percent', '-proteins-percent', '-saturatedfat-percent', '-transfat-percent', '-totalfat-percent', '-totalfiber-percent', '-sodium-percent'];
  const standardKeys = ['ENERC_KCAL', 'CHOCDF', 'PROCNT', 'FASAT', 'FATRN', 'FAT', 'FIBTG', 'NA'];

  standardDataIds.forEach((id, index) => document.getElementById(`${category}${id}`).innerText = Math.floor(nutrients[standardKeys[index]].quantity / yield));

  standardPercentIds.forEach((id, index) => document.getElementById(`${category}${id}`).innerText = Math.floor(daily[standardKeys[index]].quantity / yield));
}

// função que altera o innerText de elementos
function innerTxtChanger(category, id, text) {
  const changedElement = selectorSorter(category, id); 
  changedElement.innerText = text;
}

//Alterações para que seja uma função mais genérica, para ser adicionada à função que será chamada no listener de cada uma das categorias
function generateRecipe (data, category) {
  const { label, image, images, source, url, yield, dietLabels, healthLabels, cautions, ingredientLines, totalTime, totalNutrients, totalDaily } = extractRecipe(data);

  addAllTags(dietLabels, healthLabels, cautions);
  tableValuesRefresh(category, totalNutrients, totalDaily, yield);
	
  const imgContainer = selectorSorter(category, 'recipe-img');
  imgContainer.src = image;

  innerTxtChanger(category, 'recipe-title', label);
  innerTxtChanger(category, 'prepar-time', totalTime);
  innerTxtChanger(category, 'recipe-ingredients-number', (ingredientLines.length - 1));
  innerTxtChanger(category, 'servings-number', yield);
	
  // Requer revisão, pois não sei se a linha 104 funciona
  const instructionsBtn = selectorSorter(category, 'recipe-btn-instructions');
  instructionsBtn.onclick = window.location.href=url;
	
  const instructionsSource = instructionsBtn.nextElementSibling;
  instructionsSource.href = url;
  instructionsSource.innerText = `on ${source}`;

  const recipeIngredients = document.getElementById('recipe-ingredients'); 
  //deleta todos menos o h3 no ul
  while (recipeIngredients.firstElementChild.nextElementSibling.nextElementSibling) {
    recipeIngredients.removeChild(recipeIngredients.lastChild);
  }
  ingredientLines.forEach((each) => {
    const li = document.createElement('li');
    li.innerText = each;
    recipeIngredients.appendChild(li);
  });
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

window.onload = async () => {
  buttonSearch.addEventListener('click', addSearchLocal);
};
