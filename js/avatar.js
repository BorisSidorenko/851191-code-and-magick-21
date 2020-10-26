'use strict';

const FILE_EXTENSIONS = ['png', 'jpeg', 'jpg', 'gif'];

const setupUser = document.querySelector('.setup-user');
const fileInput = setupUser.querySelector('.upload input[type=file]');
const preview = setupUser.querySelector('.setup-user-pic');

const onFileLoad = (evt) => {
  preview.src = evt.target.result;
};

const onFileInputChange = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension))) {
    const reader = new FileReader();

    reader.addEventListener('load', onFileLoad);

    reader.readAsDataURL(file);
  }
};

fileInput.addEventListener('change', onFileInputChange);
