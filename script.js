const searchIcon = document.querySelector('#search');
const foodIcon = document.querySelector('#food');
const drinkIcon = document.querySelector('#drink');
const refreshIcon = document.querySelector('#refresh');

const tabFood = document.querySelector('#recipe-container');
const tabDrink = document.querySelector('#drink-container');
const tabSearch = document.querySelector('#search-container');

const changeTo = (element) => {
	const previous = document.querySelector('.visible');
	if (previous) {
	  previous.classList.remove('visible');
	  previous.classList.add('invisible');
	}
	element.classList.remove('invisible');
	element.classList.add('visible');
}

foodIcon.addEventListener('click', () => changeTo(tabFood));
searchIcon.addEventListener('click', () => changeTo(tabSearch));
drinkIcon.addEventListener('click', () => changeTo(tabDrink));

window.onload = () => {};