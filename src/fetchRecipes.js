const urlGenerator = (keyword, storedArray) => {	
	const url = storedArray.reduce((acc, urlString) => acc + urlString, `https://api.edamam.com/api/recipes/v2?type=public&q=${keyword}&app_id=7c7cd4bd&app_key=545204c90ab3de54ab8d84cd5aaba9dc`);
	console.log(url);
	return `${url}&random=true`;
};

//função fetch para buscar as receitas com palavra-chave na API
// const fetchSearchRecipes = async (storedArray) => {
// 	const searchElement = sessionStorage.getItem('searchElement');
// 	const response = await fetch(urlGenerator(searchElement, storedArray));
// 	const data = await response.json();
// 	return data;
// };


//função fetch para buscar as receitas de comida na API
const fetchFoodRecipes = async (storedArray) => {
	let searchElement = sessionStorage.getItem('searchElement');
	if (!searchElement) {
		searchElement = ['chicken', 'beef', 'rice', 'beans', 'pasta', 'sauce', 'potato', 'salad', 'fish', 'seafood', 'vegetable', 'tomato', 'chinese', 'italian', 'french', 'pork', 'sausage', 'ham', 'pumpkin', 'egg', 'bread', 'pastry', 'dairy', 'cheese', 'soup', 'dressing', 'cereal', 'meat', 'bakery', 'turkey', 'pepper'];
		searchElement = searchElement[Math.floor(Math.random()*searchElement.length)];
	}
	const response = await fetch(urlGenerator(searchElement, storedArray));
	const data = await response.json();
	return data;
};


//função fetch para buscar as receitas de bebida na API
const fetchDrinkRecipes = async (storedArray) => {
	const drinkKeywords = ['water', 'soda', 'vodka', 'gin', 'beer', 'wine', 'rum', 'juice'];
	const drinkElement = drinkKeywords[Math.floor(Math.random()*drinkKeywords.length)];
	const array = [...storedArray];
	array.push('&dishType=drinks');
	const response = await fetch(urlGenerator(drinkElement, array));
	const data = await response.json();
	return data;
};

module.exports = { fetchSearchRecipes, fetchFoodRecipes, fetchDrinkRecipes, urlGenerator };

//chaves de recipe que serão usadas: ['label', 'image', 'images'(obj), 'source', 'url', 'yield'(quantas porções rende - numero), 'dietLabels'(arr), 'healthLabels'(arr), 'cautions'(arr), 'ingredientLines'(arr - cada elemento é uma linha da receita), 'calories' (calorias totais de todas as porções), 'totalWeight', 'totalTime (tempo de preparo em minutos)', 'cuisineType' (arr), 'mealType' (arr), 'dishType' (arr), 'totalNutrients'(obj de obj - {label: 'Energy', quantity: 1617.7713676499998, unit: 'kcal'} - CHAVES QUE SERÃO USADAS: [ENERC_KCAL, FAT, CHOCDF, PROCNT, CHOLE, NA]), 'totalDaily'(obj - MESMAS OBSERVAÇÕES QUE O totalNutrients)]
