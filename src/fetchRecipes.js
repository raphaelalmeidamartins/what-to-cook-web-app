//pegando informação do primeiro imput de pesquisa, 'o que vc quer comer?', considerando id = 'searchElement' com button 'addSearch', 
// encodeURIComponent converte ',' e ' ' em valores usados em links: referencia: https://www.w3schools.com/tags/ref_urlencode.ASP
const buttonSearch = document.getElementById('addSearch');
const inputSearch = document.getElementById('searchElement');

const addSearchLocal = () => {
    const searchElement = encodeURIComponent(inputSearch.value);
    localStorage.setItem('searchElement', searchElement);
}
//provavelmente colocar no window.onload, se iremos usar buttons: 
buttonSearch.addEventListener('click', addSearchLocal)

//multipleCheckboxes serve para valores marcados no dietType e healthInfo, já que ambos são vários checkboxes; 
//valorClass deve ser a classe ex: .dietType e .healthInfo; dietOrHealth é diet ou health;

const multipleCheckboxes = (valorClass, dietOrHealth) => {
    let answer = '';
    Array.from(document.querySelectorAll(valorClass)).forEach((each) => {
        if (each.checked) {
            answer = `&${dietOrHealth}=` + each.value;
        }})
    localStorage.setItem(dietOrHealth, answer);
}
//colocar função acima em eventos dos buttons, se for usar button

//função com parametro para nameInput => cuisineType, mealType e dishType: 

const radioValuesLocalStorage = (nameInput) => {
    const inputValue = document.querySelector(`input[name=${nameInput}]:checked`).value;
    localStorage.setItem(nameInput, `&${nameInput}=${inputValue}`);
}

//estrutura da url global: const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchElement}&app_id=7c7cd4bd&app_key=545204c90ab3de54ab8d84cd5aaba9dc&diet=${dietType}&health=${healthInfo}&health=${healthInfo}&cuisineType=${cuisineType}&mealType=${mealType}&dishType=${dishType}&calories=${caloriesDropdown}&random=true`; Função gerar URL :
const urlGenerator = () => {
    const getSearchElement = localStorage.getItem('searchElement');
    let standartURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${getSearchElement}&app_id=7c7cd4bd&app_key=545204c90ab3de54ab8d84cd5aaba9dc`
    if (localStorage.getItem('diet') !== null) {
        standartURL += localStorage.getItem('diet');
    };
    if (localStorage.getItem('health') !== null) {
        standartURL += localStorage.getItem('health');
    };
    if (localStorage.getItem('cuisineType') !== null) {
        standartURL += localStorage.getItem('cuisineType');
    };
    if (localStorage.getItem('mealType') !== null) {
        standartURL += localStorage.getItem('mealType');
    };
    if (localStorage.getItem('dishType') !== null) {
        standartURL += localStorage.getItem('dishType');
    };
    if (localStorage.getItem('calories') !== null) {
        standartURL += localStorage.getItem('calories')
    }
}


//chave hits representa um array de objetos

//cada objeto tem 2 chaves - recipe e links

//chaves conhecidas de recipe: ['label', 'image', 'images'(obj), 'source', 'url', 'yield'(quantas porções rende - numero), 'dietLabels'(arr), 'healthLabels'(arr), 'cautions'(arr), 'ingredientLines'(arr - cada elemento é uma linha da receita), 'calories' (calorias totais de todas as porções), 'totalWeight', 'totalTime (tempo de preparo em minutos)', 'cuisineType' (arr), 'mealType' (arr), 'dishType' (arr), 'totalNutrients'(obj - {label: 'Energy', quantity: 1617.7713676499998, unit: 'kcal'} - CHAVES QUE SERÃO USADAS: [ENERC_KCAL, FAT, CHOCDF, PROCNT, CHOLE, NA]), 'totalDaily'(obj - MESMAS OBSERVAÇÕES QUE O totalNutrients)]
