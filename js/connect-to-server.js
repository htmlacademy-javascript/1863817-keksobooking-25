import {map, iconFormarkerAdvents} from './map.js';
import {createCardForMapPopup} from './generation-dom-elements.js';
import {showAlert} from './util.js';
import {typeFilterChange} from './sortAdvents.js';

const AdventList = [];

const getMarkersForMap = function (advents) {
  advents
    .slice
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

      // markerAdvents.removeLayer(map);

      markerAdvents
        .addTo(map)
        .bindPopup(createCardForMapPopup(advent));

      // markerAdvents.clearLayers();
    })
    .slice(0, 10);
};

const getData = function (onSuccess) {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((advents) => onSuccess(advents))
    .catch(() => {
      showAlert('При загрузке данных с сервара произошла ошибка, попробуйте обновить страницу');
    });
};

getData((advents) => {
  getMarkersForMap(advents);
  typeFilterChange(() => getMarkersForMap(advents));
});

// for (let i = 0; i < 10; i++) {
//   const markerAdvents = L.marker(
//     {
//       lat: advents[i].location.lat,
//       lng: advents[i].location.lng,
//     },
//     {
//       icon: iconFormarkerAdvents,
//     }
//   );

//   AdventList.push(advents[i]);

//   markerAdvents
//     .addTo(map)
//     .bindPopup(createCardForMapPopup(advents[i]));
// }
// console.log(AdventList);

export {AdventList};
