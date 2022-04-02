const blockForCards = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const translateTypes = (englishWord) => {
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

const createPhotoList = (linkList, templateClone) => {
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

const createCardForMapPopup = (advent) => {
  const cardElement = cardTemplate.cloneNode(true);
  const title = cardElement.querySelector('.popup__title');
  const address = cardElement.querySelector('.popup__text--address');
  const price = cardElement.querySelector('.popup__text--price');
  const type = cardElement.querySelector('.popup__type');
  const capacity = cardElement.querySelector('.popup__text--capacity');
  const time = cardElement.querySelector('.popup__text--time');
  const features = cardElement.querySelector('.popup__features');
  const description =  cardElement.querySelector('.popup__description');
  const avatar = cardElement.querySelector('.popup__avatar');
  const photos = advent.offer.photos;
  const photoContainer = cardElement.querySelector('.popup__photos');

  title.textContent = advent.offer.title;
  address.textContent = advent.offer.address;
  price.textContent = `${advent.offer.price} ₽/ночь`;
  type.textContent = translateTypes(advent.offer.type);
  capacity.textContent = `${advent.offer.rooms} комнаты для ${advent.offer.guests} гостей`;
  time.textContent = `Заезд после ${advent.offer.checkin}, выезд до ${advent.offer.checkout}`;

  if (advent.offer.features) {
    features.textContent = advent.offer.features.join(', ');
  } else {
    features.classList.add('hidden');
  }

  if (advent.offer.description) {
    description.textContent = advent.offer.description;
  } else {
    description.classList.add('hidden');
  }

  if (photos) {
    createPhotoList(photos, cardElement);
  } else {
    photoContainer.classList.add('hidden');
  }

  avatar.src = advent.author.avatar;

  return cardElement;
};

export {
  blockForCards,
  createCardForMapPopup,
};
