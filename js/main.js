const getRandomInteger = function (min, max) {

  if ((min || max) < 0 || max <= min || (min || max) % 1 !== 0)  {
    return 'При выборе диапозона допущена ошибка.';
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getRandomInteger(1, 50);

const getRandomFloat = function (min, max, numberAfterDot) {

  if ((min || max) < 0 || max <= min || (min || max) % 1 === 0)  {
    return 'При выборе диапозона допущена ошибка.';
  }

  const digitsDegree  = 10 ** numberAfterDot;

  return (Math.floor((Math.random() * (max - min) + min) * digitsDegree) + Math.round(Math.random())) / digitsDegree;
};

getRandomFloat(6.76, 6.77, 2);

//////////////////////////////////////////

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

// В задании написано что в title и description нужно самостоятельно придумать строку,
// не совсем понял должна она повторяться и быть 1 или их надо придумать 10 и сделать так чтобы они не повторялись,
// поэтому придумал 2 массива с 10 разными значениями и создал функцию для получения неповторяющнегося результата.
// Реализовал это за счет удаления из первоначального массива элемента который добавляется,
// исходя из того что первоначальные массивы могут мне понадобиться снова в своем первозданном виде клонирую их
const TITLES_CLONE = TITLES.slice(0);
const DESCRIPTIONS_CLONE = DESCRIPTIONS.slice(0);

const TYPES = ['palace', 'flat', 'house', 'bungalow ', 'hotel',];
const TIMES = ['12:00', '13:00', '14:00',];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',];
const PHOTO_LINKS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',];

const advent = {
  author: {
    avatar: 'img/avatars/user10.png',
  },
  offer: {
    title: 'Дворец Путина',
    address: '35.65000, 139.80000',
    price: 50000,
    type: 'palace',
    rooms: 2,
    guests: 2,
    checkin: '12:00',
    checkout: '12:00',
    features: ['wifi', 'parking', 'conditioner'],
    description: 'Великолепное, удобное и приятное жилье для комфортной жизни и времяпрепровождения',
    photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg'],
  },
  location: {
    lat: 35.65000,
    lng: 139.80000,
  },
};

//////////////////////////////////
const createStringForTitlesAndDescription = function (list) {
  let randomIndexElement = getRandomInteger(0, list.length - 1);

  if (list.length === 1) {
    randomIndexElement = 0;
  }

  const newStringFromList = list[randomIndexElement];
  list.splice(randomIndexElement, 1);
  return newStringFromList;
};

const createNumberForAddressAvatar = function () {
  const result = getRandomInteger(1, 10);
  if (result < 10) {
    return '0' + String(result);
  }

  return 10;
};

const createNewArrayForAdvent = function (startArray) {
  const forMakeLengthNewArray = startArray.length;
  const newArrayLength = getRandomInteger(1, forMakeLengthNewArray);
  let indexLastElement = startArray.length - 1;
  const cloneStartArray = startArray.slice(0);
  const newArray = [];

  for (let i = 0; i < newArrayLength; i++) {
    let indexForNewElementNewArray = getRandomInteger(0, indexLastElement);

    if (indexLastElement === 0) {
      indexForNewElementNewArray = 0;
    }

    newArray.push(cloneStartArray[indexForNewElementNewArray]);
    cloneStartArray.splice(indexForNewElementNewArray, 1);
    indexLastElement =  indexLastElement - 1;
  }
  return newArray;
};

const createAdvent = function () {
  const LAT = getRandomFloat(35.65000, 35.70000, 5);
  const LNG = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: 'img/avatars/user' + createNumberForAddressAvatar() + '.png',
    },
    offer: {
      title: createStringForTitlesAndDescription(TITLES),
      address: LAT + ', ' + LNG,
      price: getRandomInteger(15000, 100000),
      type: TYPES[getRandomInteger(0, 4)],
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: TIMES[getRandomInteger(0, 2)],
      checkout: TIMES[getRandomInteger(0, 2)],
      features: createNewArrayForAdvent(FEATURES),
      description: createStringForTitlesAndDescription(DESCRIPTIONS),
      photos: createNewArrayForAdvent(PHOTO_LINKS),
    },
    location: {
      lat: LAT,
      lng: LNG,
    },
  };
};

const LENGTH_FOR_ADVENTS_LIST = 10;
const AdventsList = Array.from({length: LENGTH_FOR_ADVENTS_LIST}, createAdvent);
