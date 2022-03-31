import {state} from './connect-to-server.js';
import {renderMarkersForMap} from './connect-to-server.js';

const housingTypeFilter = document.querySelector('#housing-type');
let newAdventsList;

housingTypeFilter.addEventListener('change', () => {
  if (state.advents) {
    newAdventsList = [];
    newAdventsList = state.advents.slice();
    // console.log(state.advents);
    console.log(newAdventsList);

    newAdventsList.forEach((advent, i) => {
      if (advent.offer.type !== housingTypeFilter.value) {
        // console.log(advent.offer.type);
        // console.log(newAdventsList[i]);
        console.log(newAdventsList.splice(i, 1));
      }
    });
    console.log(newAdventsList);
    renderMarkersForMap(newAdventsList.slice(0, 10));
  }
});

export {
  newAdventsList
};

