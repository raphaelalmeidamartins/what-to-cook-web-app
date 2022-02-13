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

const startLoading = () => {
	loadingScreen.style.display = 'flex';
};

const stopLoading = () => {
	loadingScreen.style.display = 'none';
};

foodIcon.addEventListener('click', () => changeTab(tabFood, foodIcon));
drinkIcon.addEventListener('click', () => changeTab(tabDrink, drinkIcon));
searchIcon.addEventListener('click', () => changeTab(tabSearch, searchIcon));

const displayElement = (element) => {
	element.classList.remove('hidden');
	element.classList.add('display');
};

const hideElement = (element) => {
	element.classList.remove('display');
	element.classList.add('hidden');
};

const conversationFlow = (question) => {
	question.style.height = 'fit-content';
	[...question.children].forEach((currentBubble, index) => {
		let delay = 1 * (index +1);
		currentBubble.style.transitionDelay = `${delay}s`;
		currentBubble.style.display = 'block';
		displayElement(currentBubble);
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	});
	if (question.id === 'question-5') {
		setTimeout(() => {
			formContainer.style.display = 'none';
			navbar.style.display = 'flex';
			allTabs.style.display = 'flex';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 4000);
		localStorage.setItem('preferences', 'placeholder');
		// localStorage.setItem('preferences', JSON.stringify(preferencesObj)); Exemplo de como pode substituir o placeholder;
	}
}

nextButtons.forEach((currentButton) => {
	currentButton.addEventListener('click', (event) => {
		event.preventDefault();
		const currentInputGroup = currentButton.parentElement.parentElement;
		conversationFlow(currentInputGroup.parentElement.nextElementSibling);
		currentInputGroup.remove();
	});
});

window.onload = () => {
	startLoading();
	setTimeout(() => {
		stopLoading();
	}, 1500);
	if (localStorage.length === 0) {
		navbar.style.display = 'none';
		allTabs.style.display = 'none';
		conversationFlow(questionsArray[0]);
	} else {
		formContainer.style.display = 'none';
	}
};
