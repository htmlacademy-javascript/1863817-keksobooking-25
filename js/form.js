const mainForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mainFormElements = mainForm.children;
const mapFiltersElement = mapFilters.children;

mainForm.classList.add('ad-form--disabled');
mapFilters.classList.add('ad-form--disabled');

for (const element of mainFormElements) {
  mainFormElements[element].setAttribute('disabled', 'disabled');
}

for (const element of mapFiltersElement) {
  mapFiltersElement[element].setAttribute('disabled', 'disabled');
}
