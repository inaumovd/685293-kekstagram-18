'use strict';

(function () {

//возвращает случайное число
  var getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

//возвращает случайный элемент массива
  var getRandomItem = function (array) {
    var i = getRandomInt(0, array.length - 1);
    return array[i];
  }

  var removeRandomItem = function (array) {
    var i = getRandomInt(0, array.length - 1);
    var randomItem = array.splice(i, 1);
    return randomItem[0];
  }

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomItem: getRandomItem,
    removeRandomItem: removeRandomItem
  };
})();
