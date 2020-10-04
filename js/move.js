'use strict';

(() => {
  const userDialog = document.querySelector('.setup');
  const dialogHandle = userDialog.querySelector('.upload');

  const onDialogHandleMouseDown = (evt) => {
    evt.preventDefault();

    const startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      userDialog.style.top = `${userDialog.offsetTop - shift.y}px`;
      userDialog.style.left = `${userDialog.offsetLeft - shift.x}px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
})();
