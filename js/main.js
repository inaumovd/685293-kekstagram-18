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

//Упорядочить если пригодится далее

bigPicture.classList.remove('hidden');
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
