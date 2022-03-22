const mainForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mainFormElements = mainForm.children;
const mapFiltersElement = mapFilters.children;
const priceInput = mainForm.querySelector('#price');
const typeSelector = mainForm.querySelector('#type');
const roomNumberAdventInput = mainForm.querySelector('#room_number');
const capacityAdventInput = mainForm.querySelector('#capacity');
let typeError = 0;
const timeInAdventInput = mainForm.querySelector('#timein');
const timeOutAdventInput = mainForm.querySelector('#timeout');
const resetButton = mainForm.querySelector('.ad-form__reset');

// Map

const makePageNoActive = function () {
  mainForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  for (const element of mainFormElements) {
    element.setAttribute('disabled', 'disabled');
  }

  for (const element of mapFiltersElement) {
    element.setAttribute('disabled', 'disabled');
  }
};

const makePageActive = function () {
  mainForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  for (const element of mainFormElements) {
    element.removeAttribute('disabled', 'disabled');
  }

  for (const element of mapFiltersElement) {
    element.removeAttribute('disabled', 'disabled');
  }
};

makePageNoActive();
makePageActive();

// Pristine

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form--error'
});

// Title

function validateForTitleAdvent (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator (
  mainForm.querySelector('#title'),
  validateForTitleAdvent,
  'От 30 до 100 символов'
);

// Price and Type

function validateForPrice () {
  return +priceInput.value <= 100000 && +priceInput.value >= +priceInput.min;
}

typeSelector.addEventListener('change', () => {
  const priceFieldset = mainForm.querySelector('.ad-form__element--price');
  const lastErrorMessage = priceFieldset.querySelector('.ad-form--error');
  if (lastErrorMessage) {
    lastErrorMessage.textContent = '';
  }

  switch (typeSelector.value) {
    case 'flat':
      priceInput.setAttribute('min', 1000);
      break;
    case 'bungalow':
      priceInput.setAttribute('min', 0);
      break;
    case 'house':
      priceInput.setAttribute('min', 5000);
      break;
    case 'palace':
      priceInput.setAttribute('min', 10000);
      break;
    case 'hotel':
      priceInput.setAttribute('min', 3000);
      break;
  }
});

// typeSelector.addEventListener('change', () => {
//   const priceFieldset = mainForm.querySelector('.ad-form__element--price');
//   const lastErrorMessage = priceFieldset.querySelector('.ad-form--error');
//   lastErrorMessage.textContent = '';
// });

priceInput.addEventListener('change', () => {
  const typeFieldset = mainForm.querySelector('.ad-form__element--type');
  const lastErrorMessage = typeFieldset.querySelector('.ad-form--error');
  lastErrorMessage.textContent = '';
});

function getErrorMessageForPrice () {
  let textError = '';

  if (+priceInput.value > 100000) {
    textError = 'Максимальное значение — 100.000';
  } else if (+priceInput.min === 5000) {
    textError = '«Дом» — минимальная цена 5 000';
  } else if (+priceInput.min === 10000) {
    textError = '«Дворец» — минимальная цена 10 000';
  } else if (+priceInput.min === 3000) {
    textError = '«Отель» — минимальная цена за ночь 3 000';
  } else if (priceInput.min === '0') {
    textError = '«Бунгало» — минимальная цена за ночь 0';
  } else if (+priceInput.min === 1000) {
    textError = '«Квартира» — минимальная цена за ночь 1 000';
  }
  return textError;
}

pristine.addValidator (
  priceInput,
  validateForPrice,
  getErrorMessageForPrice
);

pristine.addValidator (
  typeSelector,
  validateForPrice,
  getErrorMessageForPrice
);

// Room and Capacity

function validateRoomNumberAndCapacity () {
  if (roomNumberAdventInput.value === '1' &&  capacityAdventInput.value !== '1') {
    typeError = 1;
    return false;
  } else if (roomNumberAdventInput.value === '2' && (capacityAdventInput.value === '3' || capacityAdventInput.value === '0')) {
    typeError = 2;
    return false;
  } else if (roomNumberAdventInput.value === '3' &&  capacityAdventInput.value === '0') {
    typeError = 3;
    return false;
  } else if (roomNumberAdventInput.value === '100'  && capacityAdventInput.value !== '0') {
    typeError = 4;
    return false;
  }

  typeError = 0;
  return true;
}

function getErrorMessageForRoomNumberAndCapacity () {
  if (typeError === 1) {
    return '1 комната — «для 1 гостя»';
  } else if (typeError === 2) {
    return '2 комнаты — «для 2 гостей» или «для 1 гостя»';
  } else if (typeError === 3) {
    return '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
  } else if (typeError === 4) {
    return '100 комнат — «не для гостей»';
  }
}

roomNumberAdventInput.addEventListener('change', () => {
  const capacityFieldset = mainForm.querySelector('.ad-form__element--capacity');
  const lastErrorMessage = capacityFieldset.querySelector('.ad-form--error');
  lastErrorMessage.textContent = '';
});

capacityAdventInput.addEventListener('change', () => {
  const roomNumberFieldset = mainForm.querySelector('.ad-form__element--room-number');
  const lastErrorMessage = roomNumberFieldset.querySelector('.ad-form--error');
  lastErrorMessage.textContent = '';
});

pristine.addValidator (
  roomNumberAdventInput,
  validateRoomNumberAndCapacity,
  getErrorMessageForRoomNumberAndCapacity,
);

pristine.addValidator (
  capacityAdventInput,
  validateRoomNumberAndCapacity,
  getErrorMessageForRoomNumberAndCapacity,
);

// Time in and out

function validateTimeInputs () {
  return timeInAdventInput.value === timeOutAdventInput.value;
}

pristine.addValidator (
  timeInAdventInput,
  validateTimeInputs,
  'Поля времени заезда и отъезда должны быть равны',
);

pristine.addValidator (
  timeOutAdventInput,
  validateTimeInputs,
  'Поля времени заезда и отъезда должны быть равны',
);

// Global

resetButton.addEventListener('click', () => {
  const ErrorMessages = mainForm.querySelectorAll('.ad-form--error');
  for (let i = 0; i <= ErrorMessages.length - 1; i++) {
    ErrorMessages[i].textContent = '';
  }
});

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  Pristine.validate();
});
