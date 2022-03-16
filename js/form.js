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

// const validateForTitleAdvent = function () {
//   const titleAdventInput = document.querySelector('#title');
//   if (titleAdventInput.value.length < 30) {
//     alert('Минимальная длина — 30 символов.');
//     return false;
//   } else if (titleAdventInput.value.length > 100) {
//     alert('Максимальная длина — 100 символов.');
//     return false;
//   }

//   return true;
// };

// const validateForPriceAdvent = function () {
//   const priceAdventInput = document.querySelector('#price');
//   if (typeof priceAdventInput.value === !'number') {
//     return false;
//   }
//   if (priceAdventInput.value > 100000) {
//     return false;
//   }
// };

// const validateRoomNumberAndCapacity = function () {
//   const roomNumberAdventInput = document.querySelector('#room_number');
//   const capacityAdventInput = document.querySelector('#capacity');
//   let rightValueForCapacity;

//   switch (roomNumberAdventInput.value) {
//     case 1:
//       rightValueForCapacity = 1;
//       break;
//     case 2:
//       rightValueForCapacity = 1 || rightValueForCapacity = 2;
//       break;
//     case 3:
//       rightValueForCapacity = 1 || rightValueForCapacity = 2 || rightValueForCapacity = 3;
//       break;
//     case 100:
//       rightValueForCapacity = 0;
//       break;
//   }
// };
