import {adventsList} from './data.js';

const blockForCards = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

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

const createPhotoList = function(linkList, templateClone) {
  const photoBlock = templateClone.querySelector('.popup__photos');
  const photo = photoBlock.querySelector('.popup__photo');

  for (let i = 0; i <= linkList.length - 1; i++) {
    if(i === 0) {
      photo.src = linkList[i];
      continue;
    }
    const createImage = document.createElement('img');
    createImage.classList.add('popup__photo');
    createImage.width = 45;
    createImage.height = 40;
    createImage.alt = 'Фотография жилья';
    createImage.src = linkList[i];
    photoBlock.appendChild(createImage);
  }
};

adventsList.forEach((advent) => {
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
  createPhotoList(photosLinks, cardElement);
  cardElement.querySelector('.popup__avatar').src = advent.author.avatar;

  blockForCards.appendChild(cardElement);
});
