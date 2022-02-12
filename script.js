const searchIcon = document.querySelector('#search');
const foodIcon = document.querySelector('#food');
const drinkIcon = document.querySelector('#drink');
const refreshIcon = document.querySelector('#refresh');

const tabFood = document.querySelector('#recipe-container');
const tabDrink = document.querySelector('#drink-container');
const tabSearch = document.querySelector('#search-container');

const changeTo = (element, button) => {
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
}

foodIcon.addEventListener('click', () => changeTo(tabFood, foodIcon));
drinkIcon.addEventListener('click', () => changeTo(tabDrink, drinkIcon));
searchIcon.addEventListener('click', () => changeTo(tabSearch, searchIcon));

window.onload = () => {};
