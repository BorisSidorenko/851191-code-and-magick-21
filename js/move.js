'use strict';

const userDialog = document.querySelector('.setup');
const dialogHandle = userDialog.querySelector('.upload');

const startCoords = {
  x: 0,
  y: 0
};

const minCoords = {
  x: 400,
  y: 0
};

let dragged = false;

const onClickPreventDefault = (clickEvt) => {
  clickEvt.preventDefault();
  dialogHandle.removeEventListener('click', onClickPreventDefault);
};

const getUserDialogPosition = (shift) => {
  const top = userDialog.offsetTop - shift.y;
  const left = userDialog.offsetLeft - shift.x;

  userDialog.style.top = `${top < minCoords.y ? minCoords.y : top}px`;
  userDialog.style.left = `${left < minCoords.x ? minCoords.x : left}px`;
};

const onMouseMove = (moveEvt) => {
  moveEvt.preventDefault();

  dragged = true;

  const shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

  startCoords.x = moveEvt.clientX;
  startCoords.y = moveEvt.clientY;

  getUserDialogPosition(shift);
};

const onMouseUp = (upEvt) => {
  upEvt.preventDefault();

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);

  if (dragged) {
    dialogHandle.addEventListener('click', onClickPreventDefault);
  }
};

const onDialogHandleMouseDown = (evt) => {
  evt.preventDefault();

  startCoords.x = evt.clientX;
  startCoords.y = evt.clientY;

  dragged = false;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
