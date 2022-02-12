// icons selectors

const searchIcon = document.querySelector('#search');
const foodIcon = document.querySelector('#food');
const drinkIcon = document.querySelector('#drink');
const refreshIcon = document.querySelector('#refresh');

// loading screen selector

const loadingScreen = document.querySelector('#loading');

// tabs selectors

const header = document.querySelector('#header');
const navbar = document.querySelector('#navbar');
const allTabs = document.querySelector('#main-container');
const tabFood = document.querySelector('#recipe-container');
const tabDrink = document.querySelector('#drink-container');
const tabSearch = document.querySelector('#search-container');

// form selectors

const form = document.querySelector('#preferences-form');
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

const displayElement = (element, timer) => {
	element.classList.remove('hidden');
	setTimeout(() => 	element.classList.add('display'), timer);
};

const hiddenElement = (element, timer) => {
	element.classList.remove('display');
	setTimeout(() => 	element.classList.add('hidden'), timer);
};

const conversationFlow = (event) => {
	if (event) event.preventDefault();
	const hiddenElementsArray = document.querySelectorAll('.hidden');
	let stop = true;
	while (stop) {
		hiddenElementsArray.forEach((currentElement, index) => {
			let timer = 2 * index + 1;
			if (currentElement.tagName === 'P') {
				displayElement(currentElement);
				currentElement.style.transitionDelay = `${timer}s`
				console.log(currentElement);
			} else {
				stop = false;
				displayElement(currentElement);
				currentElement.style.transitionDelay = `${timer}s`
				throw console.log('Parou');
			}
		});
	}
};

nextButtons.forEach((element) => {
	element.addEventListener('click', conversationFlow);
});

// https://web.dev/learn/css/transitions/

window.onload = () => {
	startLoading();
	setTimeout(() => {
		stopLoading();
	}, 1000);
	conversationFlow();
};
