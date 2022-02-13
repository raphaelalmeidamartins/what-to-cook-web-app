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
