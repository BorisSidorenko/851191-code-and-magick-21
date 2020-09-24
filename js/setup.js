'use strict';

const WIZARD_COUNT = 4;

const options = {
  firstNames: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};

const userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
const setupSimilarList = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

const getRandomArrValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getWizard = () => {
  const wizard = {
    name: getRandomArrValue(options.firstNames) + ' ' + getRandomArrValue(options.lastNames),
    coatColor: getRandomArrValue(options.coatColors),
    eyesColor: getRandomArrValue(options.eyesColors)
  };

  return wizard;
};

const getWizards = (wizardsCount) => {
  const wizards = [];

  for (let i = 0; i < wizardsCount; i++) {
    wizards.push(getWizard());
  }

  return wizards;
};

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

const fragment = document.createDocumentFragment();
getWizards(WIZARD_COUNT).forEach((wizard) => {
  fragment.appendChild(renderWizard(wizard));
});
setupSimilarList.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
