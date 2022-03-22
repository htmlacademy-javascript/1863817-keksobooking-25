const mainForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mainFormElements = mainForm.children;
const mapFiltersElement = mapFilters.children;

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

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form--error'
});

function validateForTitleAdvent (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator (
  mainForm.querySelector('#title'),
  validateForTitleAdvent,
  'От 30 до 100 символов'
);

//////////////

const priceInput = mainForm.querySelector('#price');
const typeSelector = mainForm.querySelector('#type');

function validateForPrice (value) {
  if (value <= priceInput.max && value >= priceInput.min) {
    return true;
  }
  console.log(value);
  console.log(priceInput.max);
  console.log(priceInput.min);
  console.log(priceInput.value + ' <= ' + priceInput.max + ' && ' + priceInput.value + ' >= ' + priceInput.min);
  return false;
}

// priceInput.addEventListener('change', () => {
//   console.log(priceInput.value);
//   console.log(priceInput.min);
//   console.log(priceInput.max);
// });

// function validateForPrice () {
//   return priceInput.value <= priceInput.max && priceInput.value >= priceInput.min;
// }

typeSelector.addEventListener('change', () => {
  switch (typeSelector.value) {
    case 'flat':
      // priceInput.min = 1000;
      priceInput.setAttribute('min', 1000);
      break;
    case 'bungalow':
      // priceInput.min = 0;
      priceInput.setAttribute('min', 0);
      break;
    case 'house':
      // priceInput.min = 5000;
      priceInput.setAttribute('min', 5000);
      break;
    case 'palace':
      // priceInput.min = 10000;
      priceInput.setAttribute('min', 10000);
      break;
    case 'hotel':
      // priceInput.min = 3000;
      priceInput.setAttribute('min', 3000);
      break;
  }
});

// else if (priceInput.min === '0') {
//   textError = '«Бунгало» — минимальная цена за ночь 0';
// }

function getErrorMessageForPrice () {
  let textError = '';

  if (priceInput.min === 1000) {
    textError = '«Квартира» — минимальная цена за ночь 1 000';
  } else if (priceInput.min === 5000) {
    textError = '«Дом» — минимальная цена 5 000';
  } else if (priceInput.min === 10000) {
    textError = '«Дворец» — минимальная цена 10 000';
  } else if (priceInput.min === 3000) {
    textError = '«Отель» — минимальная цена за ночь 3 000';
  } else if (priceInput.value > priceInput.max) {
    textError = 'Максимальное значение — 100.000';
  }
  return textError;
}
// function getErrorMessageForPrice () {
//   let textError = '';
//   switch (priceInput.min) {
//     case '1000':
//       textError = '«Квартира» — минимальная цена за ночь 1 000';
//       break;
//     case '0':
//       textError = '«Бунгало» — минимальная цена за ночь 0';
//       break;
//     case '5000':
//       textError = '«Дом» — минимальная цена 5 000';
//       break;
//     case '10000':
//       textError = '«Дворец» — минимальная цена 10 000';
//       break;
//     case '3000':
//       textError = '«Отель» — минимальная цена за ночь 3 000';
//       break;
//     // default:
//     //   textError = 'Максимальное значение — 100.000';
//     //   break;
//   }
//   return textError;
// }

pristine.addValidator (
  priceInput,
  validateForPrice,
  getErrorMessageForPrice
);

////////////////////
const roomNumberAdventInput = mainForm.querySelector('#room_number');
const capacityAdventInput = mainForm.querySelector('#capacity');
let typeError = 0;

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
///////////////////////

const timeInAdventInput = mainForm.querySelector('#timein');
const timeOutAdventInput = mainForm.querySelector('#timeout');

function validateTimeInputs () {
  if (timeInAdventInput.value === timeOutAdventInput.value) {
    return true;
  }
  return false;
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

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  Pristine.validate();
});
