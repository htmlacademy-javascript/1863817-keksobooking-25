import {AdventList} from './connect-to-server.js';

const housingTypeFilter = document.querySelector('#housing-type');

// const typeFilterChange = function () {
//   housingTypeFilter.addEventListener('change', () => {
//     AdventList.forEach((advent) => {
//       if (advent.offer.type !== housingTypeFilter.value) {
//         AdventList.remove(advent);
//       }
//     });
//   });
// };

const typeFilterChange = function (cb) {
  housingTypeFilter.addEventListener('change', () => {
    AdventList.forEach((advent) => {
      if (advent.offer.type !== housingTypeFilter.value) {
        // const index = AdventList.indexOf(advent);
        // AdventList.splice(index, 1);
        // console.log(AdventList);

      }
    });
    cb();
  });
};

export {typeFilterChange};
