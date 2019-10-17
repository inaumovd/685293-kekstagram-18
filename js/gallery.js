'use strict';
(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var similarPhotoElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var fragment = document.createDocumentFragment();
  var NUMBER_OF_PHOTOS = 25;

//рендерит фото из элемента массива
  var renderPhoto = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;
  };

//добавляет фотографии в фрагмент и добавляет его на страницу
  var renderFragment = function (photos, quantity) {
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    similarPhotoElement.appendChild(fragment);
  };

//прячет развернутую фотографию
  // bigPicture.classList.remove('hidden');

//заполняет информацию в развернутую фотографию из первого элемента массива мока
  var renderBigPicture = function (photo) {
    var socialComments = bigPicture.querySelectorAll('.social__comment');

    bigPicture.querySelector('.big-picture__img img').setAttribute('src', photo.url);
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.lenght;

    //вставляет комментарии из массива комментариев обекта мока

    for (var i = 0; i < socialComments.length - 1; i++) {
      socialComments[i].querySelector('img').setAttribute('src', 'img/avatar-' + window.utils.getRandomInt(1, 6) + '.svg');
      socialComments[i].querySelector('img').setAttribute('alt', photo.comments[i].name);
      socialComments[i].querySelector('.social__text').textContent = photo.comments[i].message ;
    }
  };

  var onLoad = function (data) {
    renderFragment(data, NUMBER_OF_PHOTOS);
    renderBigPicture(data[3]);
  }

  var onError = function (error) {
    console.log(error);
    var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
    var main = document.querySelector('main');
    main.appendChild(errorTemplate);
  }

  window.load.load(onLoad, onError);
})();
