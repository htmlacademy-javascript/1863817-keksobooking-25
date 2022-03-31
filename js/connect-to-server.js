import {map, iconFormarkerAdvents} from './map.js';
import {createCardForMapPopup} from './generation-dom-elements.js';
import {showAlert} from './util.js';
// import {typeFilterChange, newAdventsList} from './sortAdvents.js';
// import { state } from './main.js';

const state = {
  advents: null,
};

const layerForAdvents = L.layerGroup();

const renderMarkersForMap = function (advents) {
  layerForAdvents.clearLayers();

  advents
    .forEach((advent) => {
      const markerAdvents = L.marker(
        {
          lat: advent.location.lat,
          lng: advent.location.lng,
        },
        {
          icon: iconFormarkerAdvents,
        }
      );

      markerAdvents
        .addTo(layerForAdvents)
        .bindPopup(createCardForMapPopup(advent));
    });

  layerForAdvents.addTo(map);
};


const getData = function (onSuccess) {
  return fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) =>  response.json())
    .then((advents) => {
      onSuccess(advents);
      state.advents = advents;
    })
    .catch(() => {
      showAlert('При загрузке данных с сервара произошла ошибка, попробуйте обновить страницу');
    });
};

getData((advents) => {
  renderMarkersForMap(advents.slice(0, 10));
});

export {renderMarkersForMap, state};
