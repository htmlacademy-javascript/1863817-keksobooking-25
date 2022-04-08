import {mainForm} from './validate-form.js';

const mainFormElements = mainForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElement = mapFilters.children;

const makePageActive = () => {
  mainForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  for (const element of mainFormElements) {
    element.removeAttribute('disabled');
  }

  for (const element of mapFiltersElement) {
    element.removeAttribute('disabled');
  }
};

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    makePageActive();
  })

  .setView({
    lat: 35.68444,
    lng: 139.77142,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const iconForMainMarker = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.68444,
    lng: 139.77142,
  },
  {
    draggable: true,
    icon: iconForMainMarker,
  }
);

mainMarker.addTo(map);

addressInput.value = '35.68444, 139.77142';

mainMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();

  addressInput.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});

const iconFormarkerAdvents = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export {
  map,
  iconFormarkerAdvents,
  mapFilters
};
