'use strict';

(() => {
  const WIZARD_COUNT = 4;
  const FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  const LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  const userDialog = document.querySelector('.setup');
  const setupSimilarList = document.querySelector('.setup-similar-list');
  const similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
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
    coatColor: window.colorize.getCoatColor(),
    eyesColor: window.colorize.getEyesColor()
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

  setupSimilarList.appendChild(createWizardsFragment());

  showCharacters();

  const onUserNameInput = () => window.validation.validateUserName();

  userNameInput.addEventListener('input', onUserNameInput);

  const onWizardCoatClick = () => {
    wizardCoat.style.fill = window.colorize.getCoatColor();
    wizardCoatHidden.value = wizardCoat.style.fill;
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);

  const onWizardEyesClick = () => {
    wizardEyes.style.fill = window.colorize.getEyesColor();
    wizardEyesHidden.value = wizardEyes.style.fill;
  };

  wizardEyes.addEventListener('click', onWizardEyesClick);

  const onWizardFireballClick = () => {
    const fireballColor = window.colorize.getFireballColor();
    wizardFireball.style.backgroundColor = fireballColor;
    wizardFireballHidden.value = fireballColor;
  };

  wizardFireball.addEventListener('click', onWizardFireballClick);
})();
