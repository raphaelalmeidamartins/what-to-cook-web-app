const searchIcon = document.querySelector('#search');
const foodIcon = document.querySelector('#food');
const drinkIcon = document.querySelector('#drink');
const refreshIcon = document.querySelector('#refresh');

const loadingScreen = document.querySelector('#loading');

const header = document.querySelector('#header');
const navbar = document.querySelector('#navbar');
const allTabs = document.querySelector('#main-container');
const tabFood = document.querySelector('#recipe-container');
const tabDrink = document.querySelector('#drink-container');
const tabSearch = document.querySelector('#search-container');

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

const startLoading = () => {
	header.style.display = 'none';
	navbar.style.display = 'none';
	allTabs.style.display = 'none';
	loadingScreen.style.display = 'flex';
};

const stopLoading = () => {
	header.style.display = 'flex';
	navbar.style.display = 'flex';
	allTabs.style.display = 'block';
	loadingScreen.style.display = 'none';
};

foodIcon.addEventListener('click', () => changeTab(tabFood, foodIcon));
drinkIcon.addEventListener('click', () => changeTab(tabDrink, drinkIcon));
searchIcon.addEventListener('click', () => changeTab(tabSearch, searchIcon));

window.onload = () => {
	startLoading();
	setTimeout(() => {
		stopLoading();
	}, 1000);
};
