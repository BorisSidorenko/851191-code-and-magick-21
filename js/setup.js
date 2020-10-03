'use strict';

const WIZARD_COUNT = 4;
const NAME_LENGTH_MIN = 2;
const NAME_LENGTH_MAX = 25;

const FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

const KeyCode = {
  ESC_CODE: 'Escape',
  ENTER_CODE: 'Enter'
};

const UserNameMessage = {
  LENGTH_TOO_SHORT: `Ещё X симв.`,
  LENGTH_TOO_LONG: `Удалите лишние X симв.`
};

const userDialog = document.querySelector('.setup');
const setupSimilarList = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
const setupOpen = document.querySelector('.setup-open');
const setupClose = document.querySelector('.setup-close');
const userNameInput = document.querySelector('.setup-user-name');
const wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
const wizardCoatHidden = document.querySelector('input[name="coat-color"]');
const wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
const wizardEyesHidden = document.querySelector('input[name="eyes-color"]');
const wizardFireball = document.querySelector('.setup-fireball-wrap');
const wizardFireballHidden = document.querySelector('input[name="fireball-color"]');


const showCharacters = () => userDialog.querySelector('.setup-similar').classList.remove('hidden');

const getRandomNumberMaxToMin = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const getWizard = () => ({
  name: FIRST_NAMES[getRandomNumberMaxToMin(FIRST_NAMES.length - 1)] + ' ' + LAST_NAMES[getRandomNumberMaxToMin(LAST_NAMES.length - 1)],
  coatColor: COAT_COLORS[getRandomNumberMaxToMin(COAT_COLORS.length - 1)],
  eyesColor: EYES_COLORS[getRandomNumberMaxToMin(EYES_COLORS.length - 1)]
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
  if (evt.key === KeyCode.ESC_CODE && document.activeElement !== userNameInput) {
    evt.preventDefault();
    closePopup();
  }
};

setupSimilarList.appendChild(createWizardsFragment());

showCharacters();

const openPopup = () => {
  userDialog.classList.toggle('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

const closePopup = () => {
  userDialog.classList.toggle('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

const onSetupOpenClick = () => openPopup();

const onSetupOpenEnterPress = (evt) => {
  if (evt.key === KeyCode.ENTER_CODE) {
    openPopup();
  }
};

setupOpen.addEventListener('click', onSetupOpenClick);

setupOpen.addEventListener('keydown', onSetupOpenEnterPress);

const onSetupCloseClick = () => closePopup();

const onSetupCloseEnterPress = (evt) => {
  if (evt.key === KeyCode.ENTER_CODE) {
    closePopup();
  }
};

setupClose.addEventListener('click', onSetupCloseClick);

setupClose.addEventListener('keydown', onSetupCloseEnterPress);

const onUserNameInput = () => {
  const nameLength = userNameInput.value.length;
  if (nameLength < NAME_LENGTH_MIN) {
    userNameInput.setCustomValidity(UserNameMessage.LENGTH_TOO_SHORT.replace('X', `${NAME_LENGTH_MIN - nameLength}`));
  } else if (nameLength > NAME_LENGTH_MAX) {
    userNameInput.setCustomValidity(UserNameMessage.LENGTH_TOO_LONG.replace('X', `${nameLength - NAME_LENGTH_MAX}`));
  } else {
    userNameInput.setCustomValidity('');
  }

  userNameInput.reportValidity();
};

userNameInput.addEventListener('input', onUserNameInput);

const onWizardCoatClick = () => {
  wizardCoat.style.fill = COAT_COLORS[getRandomNumberMaxToMin(COAT_COLORS.length - 1)];
  wizardCoatHidden.value = wizardCoat.style.fill;
};

wizardCoat.addEventListener('click', onWizardCoatClick);

const onWizardEyesClick = () => {
  wizardEyes.style.fill = EYES_COLORS[getRandomNumberMaxToMin(EYES_COLORS.length - 1)];
  wizardEyesHidden.value = wizardEyes.style.fill;
};

wizardEyes.addEventListener('click', onWizardEyesClick);

const onWizardFireballClick = () => {
  const fireballColor = FIREBALL_COLORS[getRandomNumberMaxToMin(FIREBALL_COLORS.length - 1)];
  wizardFireball.style.backgroundColor = fireballColor;
  wizardFireballHidden.value = fireballColor;
};

wizardFireball.addEventListener('click', onWizardFireballClick);
