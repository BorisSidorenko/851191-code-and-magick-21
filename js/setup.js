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

const showUserDialog = () => userDialog.classList.remove('hidden');

const showCharacters = () => userDialog.querySelector('.setup-similar').classList.remove('hidden');

const getRandomArrValue = (arrLength) => Math.floor(Math.random() * arrLength);

const getWizard = () => ({
  name: options.firstNames[getRandomArrValue(options.firstNames.length)] + ' ' + options.lastNames[getRandomArrValue(options.lastNames.length)],
  coatColor: options.coatColors[getRandomArrValue(options.coatColors.length)],
  eyesColor: options.eyesColors[getRandomArrValue(options.eyesColors.length)]
});

const getWizards = (wizardsCount) => {
  const wizards = [];

  for (let i = 0; i < wizardsCount; i++) {
    wizards.push(getWizard());
  }

  return wizards;
};

const createWizardsFragment = () => {
  const fragment = document.createDocumentFragment();

  getWizards(WIZARD_COUNT).forEach((wizard) => {
    fragment.appendChild(renderWizard(wizard));
  });

  return fragment;
};

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

showUserDialog();

setupSimilarList.appendChild(createWizardsFragment());

showCharacters();
