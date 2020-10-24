'use strict';

const userDialog = document.querySelector('.setup');
const wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
const wizardCoatHidden = document.querySelector('input[name="coat-color"]');
const wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
const wizardEyesHidden = document.querySelector('input[name="eyes-color"]');
const wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
const wizardFireballHidden = document.querySelector('input[name="fireball-color"]');

let wizard = {
  onCoatChange: () => {},
  onEyesChange: () => {}
};

const onWizardCoatClick = () => {
  const newColor = window.colorize.getCoatColor();
  wizardCoat.style.fill = newColor;
  wizardCoatHidden.value = newColor;
  wizard.onCoatChange(newColor);
};

wizardCoat.addEventListener('click', onWizardCoatClick);

const onWizardEyesClick = () => {
  const newColor = window.colorize.getEyesColor();
  wizardEyes.style.fill = newColor;
  wizardEyesHidden.value = newColor;
  wizard.onEyesChange(newColor);
};

wizardEyes.addEventListener('click', onWizardEyesClick);

const onWizardFireballClick = () => {
  const fireballColor = window.colorize.getFireballColor();
  wizardFireball.style.backgroundColor = fireballColor;
  wizardFireballHidden.value = fireballColor;
};

wizardFireball.addEventListener('click', onWizardFireballClick);

window.wizard = {
  coatChangeHandler: (cb) => {
    wizard.onCoatChange = cb;
  },
  eyesChangeHandler: (cb) => {
    wizard.onEyesChange = cb;
  }
};
