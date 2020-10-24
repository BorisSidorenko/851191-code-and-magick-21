'use strict';

const URL_GET = 'https://21.javascript.pages.academy/code-and-magick/data';
const URL_SEND = 'https://21.javascript.pages.academy/code-and-magick';
const TIMEOUT_MS = 10000;

const StatusCode = {
  OK: 200
};

const onLoadComplete = (xhr, onLoad, onError) => () => {
  if (xhr.status === StatusCode.OK) {
    onLoad(xhr.response);
  } else {
    onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
  }
};

const onFail = (onError) => () => onError('Произошла ошибка соединения');

const onTimeout = (xhr, onError) => () => onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);

const load = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT_MS;

  xhr.addEventListener('load', onLoadComplete(xhr, onLoad, onError));

  xhr.addEventListener('error', onFail(onError));

  xhr.addEventListener('timeout', onTimeout(xhr, onError));

  xhr.open('GET', URL_GET);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT_MS;

  xhr.addEventListener('load', onLoadComplete(xhr, onLoad, onError));

  xhr.open('POST', URL_SEND);
  xhr.send(data);
};

window.backend = {
  load,
  save
};
