'use strict';

const WIZARD_COUNT = 4;

const setupSimilarList = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

const renderWizard = ({name, colorCoat, colorEyes}) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = name;
  wizardElement.querySelector('.wizard-coat').style.fill = colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = colorEyes;

  return wizardElement;
};

const addWizardToFragment = (fragment) => (wizard) => fragment.appendChild(renderWizard(wizard));

window.render = (wizards) => {
  setupSimilarList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  wizards.slice(0, WIZARD_COUNT).forEach(addWizardToFragment(fragment));
  setupSimilarList.appendChild(fragment);
};
