const getRandomInteger = function (min, max) {

  if ((min || max) < 0 || max < min || (min || max) % 1 !== 0)  {
    return 'При выборе диапозона допущена ошибка.';
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getRandomInteger(1, 50);

const getRandomFloat = function (min, max, numberAfterDot) {

  if ((min || max) < 0 || max < min || (min || max) % 1 === 0)  {
    return 'При выборе диапозона допущена ошибка.';
  }

  const digitsDegree  = 10 ** numberAfterDot;

  return (Math.floor((Math.random() * (max - min) + min) * digitsDegree) + Math.round(Math.random())) / digitsDegree;
};

getRandomFloat(6.76, 6.77, 2);

export {
  getRandomInteger,
  getRandomFloat
};
