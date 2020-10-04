'use strict';

(() => {
  const userDialog = document.querySelector('.setup');
  const setupOpen = document.querySelector('.setup-open');
  const setupClose = userDialog.querySelector('.setup-close');
  const userNameInput = userDialog.querySelector('.setup-user-name');

  const onPopupEscPress = (evt) => {
    if (document.activeElement !== userNameInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  const openPopup = () => {
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
})();
