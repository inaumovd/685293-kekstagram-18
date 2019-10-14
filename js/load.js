'use strict';
(function () {

  var URL = ' https://js.dump.academy/kekstagram/data';

  var load = function (onSuccess, onError ) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
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

    xhr.send();
  };

  window.load = {
    load: load
  };
})();
