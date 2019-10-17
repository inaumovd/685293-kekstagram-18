'use strict';
(function () {

  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response)
          break;
        case 400:
          onError('Ошибка запроса');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        case 500:
          onError('Ошибка сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError)
    xhr.open('GET', LOAD_URL);
    xhr.send();
  }

  var upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError)
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  }

  window.load = {
    load: load,
    upload: upload
  };
})();
