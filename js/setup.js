'use strict';

(() => {
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
      rank = rank + 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank = rank + 1;
    }

    return rank;
  };

  const compareNames = (left, right) => {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = () => {
    window.render(wizards.sort((left, right) => {
      let diff = getWizardRank(right) - getWizardRank(left);
      if (diff === 0) {
        diff = compareNames(left.name, right.name);
      }
      return diff;
    }));
  };

  window.wizard.coatChangeHandler((color) => {
    coatColor = color;
    updateWizards();
  });

  window.wizard.eyesChangeHandler((color) => {
    eyesColor = color;
    updateWizards();
  });

  const successHandler = (data) => {
    wizards = data;
    updateWizards();
  };

  const errorHandler = (errorMessage) => {
    window.util.createErrorMessage(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
