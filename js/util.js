'use strict';

(() => {
  const KeyCode = {
    ESC_CODE: 'Escape',
    ENTER_CODE: 'Enter'
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
    getRandomNumberMaxToMin: (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)
  };
})();
