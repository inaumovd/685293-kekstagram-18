'use strict';
(function () {
//module4-task1
  var uploadInput = document.querySelector('#upload-file');
  var imageSetupForm = document.querySelector('.img-upload__overlay');
  var sliderPin = document.querySelector('.effect-level__pin');
  var previewImage = document.querySelector('.img-upload__preview img');
  var effectList = document.querySelector('.effects__list');

  var filters = {
    none: {
      class: 'effects__preview--none'
    },
    chrome: {
      class: 'effects__preview--chrome',
      filter: 'grayscale',
      postfix: '',
      min: 0,
      max: 1
    },
    sepia: {
      class: 'effects__preview--sepia',
      filter: 'sepia',
      postfix: '',
      min: 0,
      max: 1
    },
    marvin: {
      class: 'effects__preview--marvin',
      filter: 'invert',
      postfix: '%',
      min: 0,
      max: 100
    },
    phobos: {
      class: 'effects__preview--phobos',
      filter: 'blur',
      postfix: 'px',
      min: 0,
      max: 3
    },
    heat: {
      class: 'effects__preview--heat',
      filter: 'brightness',
      postfix: '',
      min: 1,
      max: 3
    }
  };

  var sliderMaxValue = 453;
  var slider = document.querySelector('.img-upload__effect-level');
  var sliderInput = document.querySelector('.effect-level__value');

//временно прячет редактор фото
// imageSetupForm.classList.remove('hidden');

//меняет фильтр на превью
  effectList.addEventListener('click', function (evt) {
    var currentFilter = evt.target.closest('input').getAttribute('value');
    checkSliderShow(currentFilter);
    previewImage.classList = 'img-upload__preview';
    previewImage.classList.add(filters[currentFilter].class);
    previewImage.removeAttribute('style');;
  });

//запускает редактор после загрузки фото
  uploadInput.addEventListener('change', function () {
    imageSetupForm.classList.remove('hidden');
  });

//меняет насыщенность фильтра
  var changeFilterStyle = function (image, type, value, postfix, max, min) {
    var filterValue = (max - min) * value + min;
    image.style.filter = type + '(' + filterValue + postfix + ')';
  }

//значение пина в проценты
  var makePinValueInPercent = function (value) {
    var pinValue = value/sliderMaxValue;
    return pinValue.toFixed(1);
  }

//проверка видимости слайдера
  var checkSliderShow = function (value) {
    if (value === 'none') {
      slider.style.display = 'none';
    } else {
      slider.style.display = 'block';
    }
  }

//наложение фильтра после клика
  // sliderPin.addEventListener('mouseup', function() {
  //
  // });

//настройка масштабирования изображения
  var scaleControlSmaller =  document.querySelector('.scale__control--smaller');
  var scaleControlBigger =  document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleValue = 100;
  var SCALE_VALUE_MAX = 100;
  var SCALE_VALUE_MIN = 25;
  scaleControlValue.setAttribute('value', scaleValue + '%');

  scaleControlSmaller.addEventListener('click', function() {
    if (scaleValue > SCALE_VALUE_MIN) {
      scaleValue = scaleValue - 25;
      scaleControlValue.setAttribute('value', scaleValue + '%');
      previewImage.style.transform = 'scale( +' + scaleValue/100 + ')';
    }
  });

  scaleControlBigger.addEventListener('click', function() {
    if (scaleValue < SCALE_VALUE_MAX) {
      scaleValue = scaleValue + 25;
      scaleControlValue.setAttribute('value', scaleValue + '%');
      previewImage.style.transform = 'scale( +' + scaleValue/100 + ')';
    }
  });

// валидация хэш-тегов
  var uploadButton = document.querySelector('#upload-submit');
  var hashTagInput = document.querySelector('.text__hashtags');

//валидация по клику на отправку формы
  uploadButton.addEventListener('click', function(evt) {
    if (hashTagInput.value !== '') {
      var hashTagList = hashTagInput.value.toLowerCase().split(' ');
      for (var i = 0; i < hashTagList.length; i++) {
        console.log(hashTagList[i]);
        var isHashTagValid = validationTagInput(hashTagList[i]);
        if (!isHashTagValid) {
          break;
        }
        var positionNextHashtag = i + 1;
        if (hashTagList.indexOf(hashTagList[i], positionNextHashtag) > 0) {
          hashTagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          break;
        }
      }
      if (hashTagList.length > 5) {
        console.log(hashTagList.length);
        hashTagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        break;
      }
    }
    if (!hashTagInput.validationMessage) {
      evt.preventDefault();
    }
  });

//проверка хэштега
  var validationTagInput = function(hashtag) {
    console.log(hashtag.length);
    if (hashtag[0] !== '#') {
      hashTagInput.setCustomValidity('Хеш-тег должен начинаться с символа #');
      return false;
    } else if (hashtag.length < 2) {
      hashTagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      return false;
    } else if (hashtag.length > 20) {
      hashTagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      return false;
    }
    return true;
  };

  var onHashtagInput = function () {
    hashTagInput.setCustomValidity('');
  };

  hashTagInput.addEventListener('input', onHashtagInput);

//!!добавить закрытие окна по esc и крестику

//module5-task3

  var effectPin = document.querySelector('.effect-level__pin');

  effectPin.addEventListener('mousedown', function(evt) {
    var startCoordsX = evt.clientX;

    var onMousemove = function (moveEvt) {
      var shiftX = startCoordsX - moveEvt.x;
      var position = effectPin.offsetLeft - shiftX;
      startCoordsX = moveEvt.x;

      if (position <= 0) {
        position = 0;
      }

      if (position >= 450) {
        position = 450;
      }

      effectPin.style.left = position + 'px';
    };

    var onMouseup = function (moveEvt) {
      var currentFilter = document.querySelector('input[type="radio"]:checked').value;
      var currentPosition = sliderPin.offsetLeft ;
      var filterValue = makePinValueInPercent(currentPosition);
      changeFilterStyle(previewImage, filters[currentFilter].filter, filterValue, filters[currentFilter].postfix, filters[currentFilter].max, filters[currentFilter].min);
      sliderInput.setAttribute('value', filterValue * 100);
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  });
})();
