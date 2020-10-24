'use strict';

const KeyCode = {
  ESC_CODE: 'Escape',
  ENTER_CODE: 'Enter'
};

const createErrorMessage = (errorMessage) => {
  var element = document.createElement('div');

  element.style.position = 'absolute';
  element.style.left = 0;
  element.style.right = 0;
  element.style.zIndex = 1;
  element.style.backgroundColor = 'black';
  element.style.textAlign = 'center';
  element.style.fontSize = '15px';

  element.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', element);
};

window.util = {
  isEscEvent: (evt, action) => {
    if (evt.key === KeyCode.ESC_CODE) {
      action();
    }
  },
  isEnterEvent: (evt, action) => {
    if (evt.key === KeyCode.ENTER_CODE) {
      action();
    }
  },
  getRandomNumberMaxToMin: (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),
  createErrorMessage
};
