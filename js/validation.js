'use strict';

const NAME_LENGTH_MIN = 2;
const NAME_LENGTH_MAX = 25;

const userDialog = document.querySelector('.setup');
const userNameInput = userDialog.querySelector('.setup-user-name');

const getUserNameTooShortMessage = (nameLength) => `Ещё ${NAME_LENGTH_MIN - nameLength} симв.`;
const getUserNameTooLongMessage = (nameLength) => `Удалите лишние ${nameLength - NAME_LENGTH_MAX} симв.`;

window.validation = {
  validateUserName: () => {
    const nameLength = userNameInput.value.length;
    if (nameLength < NAME_LENGTH_MIN) {
      userNameInput.setCustomValidity(getUserNameTooShortMessage(nameLength));
    } else if (nameLength > NAME_LENGTH_MAX) {
      userNameInput.setCustomValidity(getUserNameTooLongMessage(nameLength));
    } else {
      userNameInput.setCustomValidity('');
    }
    userNameInput.reportValidity();
  }
};
