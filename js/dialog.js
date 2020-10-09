'use strict';

(() => {
  const form = document.querySelector('.setup-wizard-form');
  const userDialog = document.querySelector('.setup');
  const setupOpen = document.querySelector('.setup-open');
  const setupClose = userDialog.querySelector('.setup-close');
  const userNameInput = userDialog.querySelector('.setup-user-name');

  const defaultX = getComputedStyle(userDialog).top;
  const defaultY = getComputedStyle(userDialog).left;

  const onPopupEscPress = (evt) => {
    if (document.activeElement !== userNameInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  const setDefaultPosition = () => {
    userDialog.style.top = defaultX;
    userDialog.style.left = defaultY;
  };

  const openPopup = () => {
    setDefaultPosition();
    userDialog.classList.toggle('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  const closePopup = () => {
    userDialog.classList.toggle('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  const onSetupOpenClick = () => openPopup();

  const onSetupOpenEnterPress = (evt) => {
    window.util.isEnterEvent(evt, openPopup);
  };

  setupOpen.addEventListener('click', onSetupOpenClick);

  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);

  const onSetupCloseClick = () => closePopup();

  const onSetupCloseEnterPress = (evt) => {
    window.util.isEnterEvent(evt, closePopup);
  };

  setupClose.addEventListener('click', onSetupCloseClick);

  setupClose.addEventListener('keydown', onSetupCloseEnterPress);

  const successHandler = () => {
    userDialog.classList.add('hidden');
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successHandler, errorHandler);
  });
})();
