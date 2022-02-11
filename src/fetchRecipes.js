const searchElement = localStorage.getItem('searchElement');
const storedArray = JSON.parse(localStorage.getItem('otherElements'));

const urlGenerator = (searchElement, storedArray) => {	
	const url = storedArray.reduce((acc, urlString) => acc + urlString, `https://api.edamam.com/api/recipes/v2?type=public&q=${searchElement}&app_id=7c7cd4bd&app_key=545204c90ab3de54ab8d84cd5aaba9dc`);

	return `${url}&random=true`;
};

//função fetch para buscar as receitas na API
const fetchRecipes = async () => {
	const response = await fetch(urlGenerator(searchElement, storedArray));
	const data = await response.json();
	return data;
};

module.exports = { fetchRecipes, urlGenerator };

//chave hits representa um array de objetos

//cada objeto tem 2 chaves - recipe e links

//chaves de recipe que serão usadas: ['label', 'image', 'images'(obj), 'source', 'url', 'yield'(quantas porções rende - numero), 'dietLabels'(arr), 'healthLabels'(arr), 'cautions'(arr), 'ingredientLines'(arr - cada elemento é uma linha da receita), 'calories' (calorias totais de todas as porções), 'totalWeight', 'totalTime (tempo de preparo em minutos)', 'cuisineType' (arr), 'mealType' (arr), 'dishType' (arr), 'totalNutrients'(obj de obj - {label: 'Energy', quantity: 1617.7713676499998, unit: 'kcal'} - CHAVES QUE SERÃO USADAS: [ENERC_KCAL, FAT, CHOCDF, PROCNT, CHOLE, NA]), 'totalDaily'(obj - MESMAS OBSERVAÇÕES QUE O totalNutrients)]
