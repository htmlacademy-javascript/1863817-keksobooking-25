import {state} from './server-connect.js';
import {renderMarkersForMap} from './server-connect.js';
import {mapFilters} from './map.js';
import {debounce} from './util.js';

const housingTypeFilter = mapFilters.querySelector('#housing-type');
const housingPriceFilter = mapFilters.querySelector('#housing-price');
const housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
const housingGuestsFilter = mapFilters.querySelector('#housing-guests');
const checkboxFieldset = mapFilters.querySelector('#housing-features');
const checkboxs = mapFilters.querySelectorAll('[type="checkbox"]');
const filterInputsList = [housingTypeFilter, housingPriceFilter, housingRoomsFilter, housingGuestsFilter];
let filteredList;

const defineСoincidenceSelectWithValueAny = (advent, data, filter) => {
  let filterValue = filter.value;

  if (filter.value.length === 1) {
    filterValue = +filterValue;
  }

  if (advent.offer[data] === filterValue || filter.value === 'any') {
    return true;
  }

  return false;
};

const defineСoincidencePriceValueAndFilter = (advent) => {
  const { price } = advent.offer;
  const { value } = housingPriceFilter;

  const isMiddle = value === 'middle' && price >= 10000 && price <= 50000;
  const isLow = value === 'low' && price <= 10000;
  const isHigh = value === 'high' && price >= 50000;
  const isAny = value === 'any';

  if (isMiddle || isLow || isHigh || isAny) {
    return true;
  }
  return false;
};

const defineСoincidenceCheckboxValueAndFilter = (advent) => {
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].checked) {
      if (advent.offer.features) {
        const { features }  = advent.offer;
        const result = features.some((it) => it === checkboxs[i].value);
        if (result) {
          continue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
};

const makeEventListenerforFilters = (InputName, cb) => {
  InputName.addEventListener('change', () => {
    if (state.advents) {
      const newAdventsList = state.advents.slice();
      filteredList = newAdventsList.filter((advent) => defineСoincidenceSelectWithValueAny(advent, 'type', housingTypeFilter));
      filteredList = filteredList.filter((advent) => defineСoincidencePriceValueAndFilter(advent));
      filteredList = filteredList.filter((advent) => defineСoincidenceSelectWithValueAny(advent, 'rooms', housingRoomsFilter));
      filteredList = filteredList.filter((advent) => defineСoincidenceSelectWithValueAny(advent, 'guests', housingGuestsFilter));
      filteredList = filteredList.filter((advent) => defineСoincidenceCheckboxValueAndFilter(advent));
    }
    cb();
  });
};

filterInputsList.forEach((filterInput) => {
  makeEventListenerforFilters(filterInput, debounce( () => renderMarkersForMap(filteredList.slice(0, 10)), 500));
});

const addEventListenerForCheckboxs = (cb) => {
  checkboxFieldset.addEventListener('change', (evt) => {
    if (evt.target.tagName === 'INPUT') {
      if (state.advents) {
        const newAdventsList = state.advents.slice();
        filteredList = newAdventsList.filter((advent) => defineСoincidenceSelectWithValueAny(advent, 'type', housingTypeFilter));
        filteredList = filteredList.filter((advent) => defineСoincidencePriceValueAndFilter(advent));
        filteredList = filteredList.filter((advent) => defineСoincidenceSelectWithValueAny(advent, 'rooms', housingRoomsFilter));
        filteredList = filteredList.filter((advent) => defineСoincidenceSelectWithValueAny(advent, 'guests', housingGuestsFilter));
        filteredList = filteredList.filter((advent) => defineСoincidenceCheckboxValueAndFilter(advent));
      }
    }
    cb();
  });
};

addEventListenerForCheckboxs(debounce( () => renderMarkersForMap(filteredList.slice(0, 10)), 500));
