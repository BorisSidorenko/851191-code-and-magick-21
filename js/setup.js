'use strict';

const userDialog = document.querySelector('.setup');
const userNameInput = document.querySelector('.setup-user-name');

let coatColor = 'rgb(101, 137, 164)';
let eyesColor = 'black';
let wizards = [];

const showCharacters = () => userDialog.querySelector('.setup-similar').classList.remove('hidden');

showCharacters();

const onUserNameInput = () => window.validation.validateUserName();

userNameInput.addEventListener('input', onUserNameInput);

const getWizardRank = (wizard) => {
  let rank = 0;

  if (wizard.colorCoat === coatColor) {
    rank += 2;
  }

  if (wizard.colorEyes === eyesColor) {
    rank += 1;
  }

  return rank;
};

const compareWizard = ((left, right) => {
  let diff = getWizardRank(right) - getWizardRank(left);
  if (diff === 0) {
    diff = left.name - right.name;
  }
  return diff;
});

const updateWizards = () => {
  window.render(wizards.slice().sort(compareWizard));
};

window.wizard.coatChangeHandler(window.debounce((color) => {
  coatColor = color;
  updateWizards();
}));

window.wizard.eyesChangeHandler(window.debounce((color) => {
  eyesColor = color;
  updateWizards();
}));

const successHandler = (data) => {
  wizards = data;
  updateWizards();
};

const errorHandler = (errorMessage) => {
  window.util.createErrorMessage(errorMessage);
};

window.backend.load(successHandler, errorHandler);
