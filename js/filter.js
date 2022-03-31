import {state} from './server-connect.js';
import {renderMarkersForMap} from './server-connect.js';

const mainFormFilteres = document.querySelector('.map__filters');
const housingTypeFilter = mainFormFilteres.querySelector('#housing-type');
const housingPriceFilter = mainFormFilteres.querySelector('#housing-price');
const housingRoomsFilter = mainFormFilteres.querySelector('#housing-rooms');
const housingGuestsFilter = mainFormFilteres.querySelector('#housing-guests');
// const checkboxs = mainFormFilteres.querySelectorAll('[type="checkbox"]');
const checkboxFieldset = mainFormFilteres.querySelector('#housing-features');
const filterInputList = [housingTypeFilter, housingPriceFilter, housingRoomsFilter, housingGuestsFilter];

const compareTypeValueAndFilter = function (advent) {
  if (advent.offer.type === housingTypeFilter.value) {
    return true;
  } else if (housingTypeFilter.value === 'any') {
    return true;
  }

  return false;
};

const comparePriceValueAndFilter = function (advent) {
  if (housingPriceFilter.value === 'middle') {
    if (advent.offer.price >= 10000 && advent.offer.price <= 50000) {
      return true;
    }
  } else if (housingPriceFilter.value === 'low') {
    if (advent.offer.price <= 10000) {
      return true;
    }
  } else if (housingPriceFilter.value === 'high') {
    if (advent.offer.price >= 50000) {
      return true;
    }
  }  else if (housingPriceFilter.value === 'any') {
    return true;
  }
  return false;
};

const compareRoomsValueAndFilter = function (advent) {
  if (advent.offer.rooms === +housingRoomsFilter.value) {
    return true;
  } else if (housingRoomsFilter.value === 'any') {
    return true;
  }

  return false;
};

const compareGuestsValueAndFilter = function (advent) {
  if (advent.offer.guests === +housingGuestsFilter.value) {
    return true;
  } else if (housingGuestsFilter.value === 'any') {
    return true;
  }

  return false;
};

const makeEventListenerforFilters = function (InputName) {
  InputName.addEventListener('change', () => {
    if (state.advents) {
      const newAdventsList = state.advents.slice();
      let filteredList = newAdventsList.filter((advent) => compareTypeValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => comparePriceValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => compareRoomsValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => compareGuestsValueAndFilter(advent));
      renderMarkersForMap(filteredList.slice(0, 10));
    }
  });
};

filterInputList.forEach((filterInput) => {
  makeEventListenerforFilters(filterInput);
});

checkboxFieldset.addEventListener('change', (event) => {
  const compareCheckboxValueAndFilter = function (advent) {
    if (advent.offer.features) {
      const features = advent.offer.features;
      return features.some((it) => it === event.target.value);
    } else {
      return false;
    }
  };

  if (event.target.tagName === 'INPUT') {
    if (state.advents) {
      const newAdventsList = state.advents.slice();
      let filteredList = newAdventsList.filter((advent) => compareTypeValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => comparePriceValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => compareRoomsValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => compareGuestsValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => compareCheckboxValueAndFilter(advent));
      renderMarkersForMap(filteredList.slice(0, 10));
    }
  }
});

