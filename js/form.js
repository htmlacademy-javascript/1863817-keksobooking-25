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

function validateForPrice (value) {
  return value <= 100000;
}

pristine.addValidator (
  mainForm.querySelector('#price'),
  validateForPrice,
  'Максимальное значение — 100.000'
);

////////////////////
const roomNumberAdventInput = mainForm.querySelector('#room_number');
const capacityAdventInput = mainForm.querySelector('#capacity');
let typeError = 0;

function validateRoomNumberAndCapacity (value) {
  if (value === 1 && (capacityAdventInput.value > 1 || capacityAdventInput.value === 0)) {
    typeError = 1;
    return false;
  } else if (value === 2 && (capacityAdventInput.value > 2 || capacityAdventInput.value === 0)) {
    typeError = 2;
    return false;
  } else if (value === 3 && (capacityAdventInput.value > 3 || capacityAdventInput.value === 0)) {
    typeError = 3;
    return false;
  } else if (value === 100  && capacityAdventInput.value !== 0) {
    typeError = 4;
    return false;
  }
  return true;
}

function getErrorMessage () {
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

pristine.addValidator (
  roomNumberAdventInput,
  validateRoomNumberAndCapacity(),
  getErrorMessage,
);
///////////////////////

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  Pristine.validate();
});

