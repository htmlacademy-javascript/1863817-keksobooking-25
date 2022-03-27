import {map, iconFormarkerAdvents} from './map.js';
import {createCardForMapPopup} from './generation-dom-elements.js';
import {showAlert} from './util.js';

fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advents) => {
    advents.forEach((advent) => {
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
        .addTo(map)
        .bindPopup(createCardForMapPopup(advent));
    });
  })
  .catch(() => {
    showAlert('При загрузке данных с сервара произошла ошибка, попробуйте обновить страницу');
  });

// Если понадобиться вывести не 50 а 10, написать цикл фор
