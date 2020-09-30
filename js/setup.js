'use strict';

const WIZARD_COUNT = 4;
const NAME_LENGTH_MIN = 2;
const NAME_LENGTH_MAX = 25;

const options = {
  firstNames: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

const userDialog = document.querySelector('.setup');
const setupSimilarList = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
const setupOpen = document.querySelector('.setup-open');
const setupClose = document.querySelector('.setup-close');
const userNameInput = document.querySelector('.setup-user-name');
const wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
const wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
const wizardFireball = document.querySelector('.setup-fireball-wrap');


const showCharacters = () => userDialog.querySelector('.setup-similar').classList.remove('hidden');

const getRandomNumberMaxToMin = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const getWizard = () => ({
  name: options.firstNames[getRandomNumberMaxToMin(options.firstNames.length - 1)] + ' ' + options.lastNames[getRandomNumberMaxToMin(options.lastNames.length - 1)],
  coatColor: options.coatColors[getRandomNumberMaxToMin(options.coatColors.length - 1)],
  eyesColor: options.eyesColors[getRandomNumberMaxToMin(options.eyesColors.length - 1)]
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
  if (evt.key === 'Escape' && document.activeElement !== userNameInput) {
    evt.preventDefault();
    closePopup();
  }
};

setupSimilarList.appendChild(createWizardsFragment());

showCharacters();

const openPopup = () => {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

const closePopup = () => {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', () => {
  openPopup();
});

setupOpen.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', () => {
  closePopup();
});

setupClose.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

const validateUserName = () => {
  const nameLength = userNameInput.value.length;
  if (nameLength < NAME_LENGTH_MIN) {
    userNameInput.setCustomValidity(`Ещё ${NAME_LENGTH_MIN - nameLength} симв.`);
  } else if (nameLength > NAME_LENGTH_MAX) {
    userNameInput.setCustomValidity(`Удалите лишние ${nameLength - NAME_LENGTH_MAX} симв.`);
  } else {
    userNameInput.setCustomValidity('');
  }

  userNameInput.reportValidity();
};

userNameInput.addEventListener('input', () => {
  validateUserName();
});

const changeCoatColor = () => {
  wizardCoat.style.fill = options.coatColors[getRandomNumberMaxToMin(options.coatColors.length - 1)];
  document.querySelector('input[name="coat-color"]').value = wizardCoat.style.fill;
};

wizardCoat.addEventListener('click', () => {
  changeCoatColor();
});

const changeEyesColor = () => {
  wizardEyes.style.fill = options.eyesColors[getRandomNumberMaxToMin(options.eyesColors.length - 1)];
  document.querySelector('input[name="eyes-color"]').value = wizardEyes.style.fill;
};

wizardEyes.addEventListener('click', () => {
  changeEyesColor();
});

const changeFireballColor = () => {
  wizardFireball.style.backgroundColor = options.fireballColors[getRandomNumberMaxToMin(options.fireballColors.length - 1)];
  document.querySelector('input[name="fireball-color"]').value = wizardFireball.style.backgroundColor;
};

wizardFireball.addEventListener('click', () => {
  changeFireballColor();
});
