import {eventListenerForDocumentClick} from './util.js';

const mainForm = document.querySelector('.ad-form');
const priceInput = mainForm.querySelector('#price');
const typeSelector = mainForm.querySelector('#type');
const roomNumberAdventInput = mainForm.querySelector('#room_number');
const capacityAdventInput = mainForm.querySelector('#capacity');
let typeError = 0;
const timeInAdventInput = mainForm.querySelector('#timein');
const timeOutAdventInput = mainForm.querySelector('#timeout');
const resetButton = mainForm.querySelector('.ad-form__reset');
const submitButton = mainForm.querySelector('.ad-form__submit');
let priceInputMin = '';
const sliderElement = document.querySelector('.ad-form__slider');
const PRICE_INPUT_MIN_BUNGALOW = 0;
const PRICE_INPUT_MIN_FLAT = 1000;
const PRICE_INPUT_MIN_HOTEL = 3000;
const PRICE_INPUT_MIN_HOUSE = 5000;
const PRICE_INPUT_MIN_PALACE = 10000;

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form--error'
});

const validateForTitleAdvent = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator (
  mainForm.querySelector('#title'),
  validateForTitleAdvent,
  'От 30 до 100 символов'
);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceInput.value = sliderElement.noUiSlider.get();
});

const checkChangeTypeSelector = () => {
  const priceFieldset = mainForm.querySelector('.ad-form__element--price');
  const lastErrorMessage = priceFieldset.querySelector('.ad-form--error');
  if (lastErrorMessage) {
    lastErrorMessage.textContent = '';
  }

  switch (typeSelector.value) {
    case 'flat':
      priceInputMin =  PRICE_INPUT_MIN_FLAT;
      priceInput.placeholder = PRICE_INPUT_MIN_FLAT;
      break;
    case 'bungalow':
      priceInputMin =  PRICE_INPUT_MIN_BUNGALOW;
      priceInput.placeholder = PRICE_INPUT_MIN_BUNGALOW;
      break;
    case 'house':
      priceInputMin =  PRICE_INPUT_MIN_HOUSE;
      priceInput.placeholder = PRICE_INPUT_MIN_HOUSE;
      break;
    case 'palace':
      priceInputMin =  PRICE_INPUT_MIN_PALACE;
      priceInput.placeholder = PRICE_INPUT_MIN_PALACE;
      break;
    case 'hotel':
      priceInputMin =  PRICE_INPUT_MIN_HOTEL;
      priceInput.placeholder = PRICE_INPUT_MIN_HOTEL;
      break;
  }
};

const validateForPrice = () => {
  checkChangeTypeSelector();

  return +priceInput.value <= 100000 && +priceInput.value >= priceInputMin;
};

typeSelector.addEventListener('change', (checkChangeTypeSelector));

priceInput.addEventListener('input', () => {
  const typeFieldset = mainForm.querySelector('.ad-form__element--type');
  const lastErrorMessage = typeFieldset.querySelector('.ad-form--error');
  if (lastErrorMessage) {
    lastErrorMessage.textContent = '';
  }
});

const getErrorMessageForPrice = () => {
  let textError = '';

  if (+priceInput.value > 100000) {
    textError = 'Максимальное значение — 100.000';
  } else if (priceInputMin === 5000) {
    textError = 'Минимальная цена 5 000';
  } else if (priceInputMin === 10000) {
    textError = 'Минимальная цена 10 000';
  } else if (priceInputMin === 3000) {
    textError = 'Минимальная цена 3 000';
  } else if (priceInputMin === 0) {
    textError = 'Минимальная цена 0';
  } else if (priceInputMin === 1000) {
    textError = 'Минимальная цена 1 000';
  }

  return textError;
};

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

const validateRoomNumberAndCapacity = () => {
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
};

const getErrorMessageForRoomNumberAndCapacity = () => {
  let errorMessage = '';

  switch (typeError) {
    case 1:
      errorMessage = '1 комната — «для 1 гостя»';
      break;
    case 2:
      errorMessage = '2 комнаты — «для 2 гостей» или «для 1 гостя»';
      break;
    case 3:
      errorMessage = '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
      break;
    case 4:
      errorMessage = '100 комнат — «не для гостей»';
      break;
  }

  return errorMessage;
};

roomNumberAdventInput.addEventListener('change', () => {
  const capacityFieldset = mainForm.querySelector('.ad-form__element--capacity');
  const lastErrorMessage = capacityFieldset.querySelector('.ad-form--error');
  if (lastErrorMessage) {
    lastErrorMessage.textContent = '';
  }
});

capacityAdventInput.addEventListener('change', () => {
  const roomNumberFieldset = mainForm.querySelector('.ad-form__element--room-number');
  const lastErrorMessage = roomNumberFieldset.querySelector('.ad-form--error');
  if (lastErrorMessage) {
    lastErrorMessage.textContent = '';
  }
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

const validateTimeInputs = () => timeInAdventInput.value === timeOutAdventInput.value;

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

resetButton.addEventListener('click', () => {
  const ErrorMessages = mainForm.querySelectorAll('.ad-form--error');
  for (let i = 0; i <= ErrorMessages.length - 1; i++) {
    ErrorMessages[i].textContent = '';
  }
});

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);

    fetch(
      'https://25.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
        type: 'multipart/form-data',
      },
    )
      .then(() => {
        submitButton.setAttribute('disabled', 'disabled');
        const successTemplate = document.querySelector('#success')
          .content
          .querySelector('.success');
        const seccessMessage = successTemplate.cloneNode(true);
        document.body.append(seccessMessage);
        evt.target.reset();
        document.addEventListener('click', () => eventListenerForDocumentClick('click', seccessMessage));
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            seccessMessage.remove();
          }
        });
      })
      .catch(() => {
        const errorTemplate = document.querySelector('#error')
          .content
          .querySelector('.error');
        const errorMessage = errorTemplate.cloneNode(true);
        document.body.append(errorMessage);
        const errorButtonClose = errorMessage.querySelector('.error__button');
        errorButtonClose.addEventListener('click', () => eventListenerForDocumentClick('click', errorMessage));
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            errorMessage.remove();
          }
        });
      });
  }
});

export {mainForm};
