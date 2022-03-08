import getRandomInteger from './util.js';
import getRandomFloat from './util.js';

const TITLES = [
  'Комфортная жилплощадь',
  'Лучшее для лучших',
  'На оркаине города',
  'Квартира в центре',
  'Только славянам',
  'Без животных и детей',
  'В стиле хай-тек',
  'Старое здание',
  'Недалеко от метро',
  'Без посредника',
];
const DESCRIPTIONS = [
  'Квартира просторная,комнаты отдельные. Большая кухня и санузел. Рассматриваются семьи с детьми,а также бригады инженеров,рабочих на разный срок проживания.',
  'Kвapтиpa c eвpоремонтoм,всё новoе,новый рeмoнт,мeбель и тexника! Зaлог можно разбить на несколько частей.',
  'Квартира и фото реальные! Cемьи c дeтьми тoжe рaссмaтриваются! Спешите!',
  'Рядом Ocтaновки, pынoк, парки, нeдалeкo от cтаpогo автoвoкзaлa, пр Шoлохoва. Во дворe имeются меcтa для пaркoвки.',
  'Студeнтов paсcматpивают! Cдаю oтличную 1-ю квapтиру в цeнтре Сельмашa,на Mетaллургичеcкoй,107.',
  'Квартира в отличном состоянии, хорошо отапливаемая, свежий ремонт, трубы и окна м/п, новые, балкон застеклён - м/п рама, и утеплен. Есть все необходимое для проживания.',
  'Предoплaтa - за 1 месяц вперёд. Залог - за 1 месяц. Квитанции оплачиваются отдельно',
  'Свoeвремeннaя oплата, и тoлько нa длительный сpок - минимум гoд.',
  'COБCTBEHHИК!!! НЕ АГEНTСТBO!!! БЕЗ ПOСPЕДHИKOB!!!',
  'Осмотр квартиры по договорённости: пр. Коммунистический д.44. На сообщения не отвечаю. Звоните!!! Просьба к агентствам, не беспокоить!',
];

const TYPES = ['palace', 'flat', 'house', 'bungalow ', 'hotel',];
const TIMES = ['12:00', '13:00', '14:00',];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',];
const PHOTO_LINKS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createNumberForAddressAvatar = function () {
  const result = getRandomInteger(1, 10);
  if (result < 10) {
    return `0${String(result)}`;
  }

  return 10;
};

const extractRandomEntityFromArr = function (list) {
  const randomIndexElement = getRandomInteger(0, list.length - 1);

  const newStringFromList = list[randomIndexElement];
  list.splice(randomIndexElement, 1);
  return newStringFromList;
};

const createRandomEntitiesArray  = function (startArray) {
  const newArrayLength = getRandomInteger(1, startArray.length);
  const cloneStartArray = startArray.slice(0);
  const newArray = [];

  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(extractRandomEntityFromArr(cloneStartArray));
  }

  return newArray;
};

const createAdvent = function () {
  const LAT = getRandomFloat(35.65000, 35.70000, 5);
  const LNG = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${createNumberForAddressAvatar()}.png`,
    },
    offer: {
      title: extractRandomEntityFromArr(TITLES),
      address: `${LAT}, ${LNG}`,
      price: getRandomInteger(15000, 100000),
      type: TYPES[getRandomInteger(0, 4)],
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: TIMES[getRandomInteger(0, 2)],
      checkout: TIMES[getRandomInteger(0, 2)],
      features: createRandomEntitiesArray (FEATURES),
      description: extractRandomEntityFromArr(DESCRIPTIONS),
      photos: createRandomEntitiesArray (PHOTO_LINKS),
    },
    location: {
      lat: LAT,
      lng: LNG,
    },
  };
};

const LENGTH_FOR_ADVENTS_LIST = 10;
const AdventsList = Array.from({length: LENGTH_FOR_ADVENTS_LIST}, createAdvent);
