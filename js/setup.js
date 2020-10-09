'use strict';

(() => {
  const WIZARD_COUNT = 4;

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

  const addWizardToFragment = (fragment) => (wizard) => fragment.appendChild(renderWizard(wizard));

  const renderWizard = ({name, colorCoat, colorEyes}) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = name;
    wizardElement.querySelector('.wizard-coat').style.fill = colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = colorEyes;

    return wizardElement;
  };

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

  const successHandler = (wizards) => {
    const fragment = document.createDocumentFragment();
    wizards.slice(0, WIZARD_COUNT).forEach(addWizardToFragment(fragment));
    setupSimilarList.appendChild(fragment);
  };

  const errorHandler = (errorMessage) => {
    var element = document.createElement('div');
    element.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.fontSize = '30px';

    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
  };

  window.backend.load(successHandler, errorHandler);
})();
