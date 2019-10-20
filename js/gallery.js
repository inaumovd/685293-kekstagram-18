'use strict';
(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var similarPhotoElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var fragment = document.createDocumentFragment();
  var filters = document.querySelector('.img-filters');
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

  var dataArray = [];
  var renderedPictures;

  var onLoad = function (data) {
    dataArray = data;
    renderFragment(dataArray, NUMBER_OF_PHOTOS);
    renderBigPicture(dataArray[3]);
    filters.classList.remove('img-filters--inactive');
    renderedPictures = document.querySelectorAll('.picture')
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

  //фильтрация фотографий

  var filterButtonPopular = document.querySelector('#filter-popular');
  var filterButtonRandom = document.querySelector('#filter-random');
  var filterButtonDiscussed = document.querySelector('#filter-discussed');

  filterButtonPopular.addEventListener('click', function () {
    filterButtonRandom.classList = 'img-filters__button';
    filterButtonDiscussed.classList = 'img-filters__button';
    filterButtonPopular.classList.add('img-filters__button--active');

    renderedPictures.forEach(e => e.parentNode.removeChild(e));
    renderFragment(dataArray, NUMBER_OF_PHOTOS);
    renderedPictures = document.querySelectorAll('.picture')
  });

  filterButtonRandom.addEventListener('click', function () {
    filterButtonPopular.classList = 'img-filters__button';
    filterButtonDiscussed.classList = 'img-filters__button';
    filterButtonRandom.classList.add('img-filters__button--active');

    var dataCopyArray = dataArray.slice();
    var randomPhotoArray = [];

    for (var i = 0; i < 10; i++) {
      var randomItem = window.utils.removeRandomItem(dataCopyArray);
      randomPhotoArray.push(randomItem);
    }

    renderedPictures.forEach(e => e.parentNode.removeChild(e));

    renderFragment(randomPhotoArray, 10);

    renderedPictures = document.querySelectorAll('.picture')
  });

  filterButtonDiscussed.addEventListener('click', function () {
    filterButtonRandom.classList = 'img-filters__button';
    filterButtonPopular.classList = 'img-filters__button';
    this.classList.add('img-filters__button--active');
    var dataCopyArray = dataArray.slice();
    dataCopyArray.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      return 0;
    });
    renderedPictures.forEach(e => e.parentNode.removeChild(e));
    renderFragment(dataCopyArray, NUMBER_OF_PHOTOS);
    renderedPictures = document.querySelectorAll('.picture')
  });

})();
