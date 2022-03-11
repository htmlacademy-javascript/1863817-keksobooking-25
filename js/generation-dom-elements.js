import {AdventsList} from './data.js';

// const cardTemplate = document.querySelector('.popup'); НЕ ПОНИМАЮ ПОЧЕМУ НЕ ПОЛУЧАЕТССЯ НАЙТИ И РАБОТАТЬ С ПОПАП ТАКИМ ОБРАЗОМ
// И ПРИХОДИТСЯ ДЕЛАТЬ ТО ЧТО С 6 ПО 9 СТРОКУ
const blockForCards = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarCards = AdventsList;

const traslateTypes = function (englishWord) {
  let russianWord = '';

  switch (englishWord) {
    case 'flat':
      russianWord = 'Квартира';
      break;
    case 'bungalow':
      russianWord = 'Бунгало';
      break;
    case 'house':
      russianWord = 'Дом';
      break;
    case 'palace':
      russianWord = 'Дворец';
      break;
    case 'hotel':
      russianWord = 'Отель';
      break;
  }

  return russianWord;
};

const createPhotoList = function(linkList) {

  for (let i = 0; i <= linkList.length; i++) {
    const photoBlock = document.querySelector('.popup__photos');
    const photo = document.querySelector('.popup__photo');

    if(i === 0) {
      photo.src = linkList[i];
      // photoBlock.child.src = linkList[i];
      continue;
    }
    const createImage = document.createElement('img');
    createImage.classList.add('.popup__photo');
    photoBlock.appendChild(createImage);
    createImage.src = linkList[i];
  }
};
// ФУНКЦИЯ НЕ ОТРАБАТЫВАЕТ НЕ МОГУ ПОНЯТЬ В ЧЕМ ОШИБКА

similarCards.forEach((advent) => {
  const cardElement = cardTemplate.cloneNode(true);
  const features = advent.offer.features;
  const photosLinks = advent.offer.photos;
  cardElement.querySelector('.popup__title').textContent = advent.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advent.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${advent.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = traslateTypes(advent.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${advent.offer.rooms} комнаты для ${advent.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${advent.offer.checkin}, выезд до ${advent.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = features.join(', ');
  cardElement.querySelector('.popup__description').textContent = advent.offer.description;
  createPhotoList(photosLinks); ///
  cardElement.querySelector('.popup__avatar').src = advent.author.avatar;


  blockForCards.appendChild(cardElement);
});

// const photosLinks = advent.offer.photos;
// photosLinks.forEach((value, index) => {
//   if (index === 0) {
//     cardElement.querySelector('.popup__photo').src = value;
//   }
//   const createImage = document.createElement('img');
//   createImage.addEventListener('.popup__photo');
//   createImage.src = value;
// });
