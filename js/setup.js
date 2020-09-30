'use strict';

const WIZARD_COUNT = 4;

const options = {
  firstNames: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};

const userDialog = document.querySelector('.setup');
const setupSimilarList = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
const setupOpen = document.querySelector('.setup-open');
const setupClose = document.querySelector('.setup-close');
const setupUserName = document.querySelector('.setup-user-name');

const showCharacters = () => userDialog.querySelector('.setup-similar').classList.remove('hidden');

const getRandomArrValue = (arrLength) => Math.floor(Math.random() * arrLength);

const getWizard = () => ({
  name: options.firstNames[getRandomArrValue(options.firstNames.length)] + ' ' + options.lastNames[getRandomArrValue(options.lastNames.length)],
  coatColor: options.coatColors[getRandomArrValue(options.coatColors.length)],
  eyesColor: options.eyesColors[getRandomArrValue(options.eyesColors.length)]
});

const getWizards = (wizardsCount) => new Array(wizardsCount).fill(undefined).map(getWizard);

const createWizardsFragment = () => {
  const fragment = document.createDocumentFragment();

  getWizards(WIZARD_COUNT).forEach(addWizardToFragment(fragment));

  return fragment;
};


const addWizardToFragment = (fragment) => (wizard) => fragment.appendChild(renderWizard(wizard));


const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

const onPopupEscPress = (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

const closePopup = () => {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});


setupSimilarList.appendChild(createWizardsFragment());

showCharacters();
