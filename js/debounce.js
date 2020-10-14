'use strict';

(() => {
  const INTERVAL = 300;

  window.debounce = (cb) => {
    let lastTimeout = null;

    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => cb(...args), INTERVAL);
    };
  };
})();
