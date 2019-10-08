'use strict';

var NUMBER_OF_PHOTOS = 25;

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var AVATARS = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];

var NAMES = ['Александр', 'Марк', 'Георгий', 'Артемий', 'Дмитрий', 'Константин', 'Давид', 'Эмиль', 'Максим', 'Тимур', 'Платон', 'Назар', 'Сергей', 'Олег', 'Анатолий', 'Савва', 'Андрей', 'Ярослав', 'Григорий', 'Ян', 'Алексей', 'Антон', 'Демид', 'Рустам', 'Глеб'];

var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var similarPhotoElement = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var fragment = document.createDocumentFragment();


var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomItem = function (array) {
  var i = getRandomInt(0, array.length - 1);
  return array[i];
}

var getUrlsArray = function () {
  var urls = [];
  for (var i = 1; i < NUMBER_OF_PHOTOS + 1; i++) {
    var url = 'photos/' + i + '.jpg';
    urls.push(url);
  }
  return urls;
};

var getComments = function () {
  var comments = [];
  var quantity = getRandomInt(1, 2);
  for (var i = 0; i < quantity; i++) {
    var comment = {
      avatar: getRandomItem(AVATARS),
      message: getRandomItem(MESSAGES),
      name: getRandomItem(NAMES)
    }
    comments.push(comment);
  }
  return comments;
};

var getMockArray = function (quantity) {
  var urls = getUrlsArray(quantity);
  var mockArray = [];
  for (var i = 0; i < quantity; i++) {
    var mock = {
      url: urls[i],
      description: 'text',
      likes: getRandomInt(15, 200),
      comments: getComments(),
    }
    mockArray.push(mock);
  }
  return mockArray;
};

var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;
};

var renderFragment = function (photos) {
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  similarPhotoElement.appendChild(fragment);
};

var mock = getMockArray(25);
renderFragment(mock);

//Заполнение карточки фотографии. Упорядочить если пригодится далее

// bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img img').setAttribute('src', mock[1].url);
bigPicture.querySelector('.likes-count').textContent = mock[1].likes;
bigPicture.querySelector('.comments-count').textContent = mock[1].comments.lenght;

var socialComments = bigPicture.querySelectorAll('.social__comment');

for (var i = 0; i < socialComments.length; i++) {
  for (var i = 0; i < mock[1].comments.length; i++) {
    socialComments[i].querySelector('img').setAttribute('src', 'img/avatar-' + getRandomInt(1, 6) + '.svg');
    socialComments[i].querySelector('img').setAttribute('alt', mock[1].comments[i].name);
    socialComments[i].querySelector('.social__text').textContent = mock[1].comments[i].message ;
  }
}

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

//временно
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
  console.log(filterValue);
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
sliderPin.addEventListener('mouseup', function() {
  var currentFilter = document.querySelector('input[type="radio"]:checked').value;
  var currentPosition = sliderPin.offsetLeft ;
  var filterValue = makePinValueInPercent(currentPosition);
  changeFilterStyle(previewImage, filters[currentFilter].filter, filterValue, filters[currentFilter].postfix, filters[currentFilter].max, filters[currentFilter].min);
  sliderInput.setAttribute('value', filterValue * 100);
});

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

//добавить закрытие окна по esc и крестику
