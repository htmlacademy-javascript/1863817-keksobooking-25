let getRandomInteger = function (min, max) {

  if ((min || max) < 0 || max <= min || (min || max) % 1 !== 0)  {
    return console.log("При выборе диапозона допущена ошибка.")
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

getRandomInteger(1, 50);

let getRandomFloat = function (min, max, numberAfterDot) {

  if ((min || max) < 0 || max <= min || (min || max) % 1 === 0)  {
    return console.log("При выборе диапозона допущена ошибка.")
  }

  let digitsDegree  = 10 ** numberAfterDot

  return Math.floor((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}

getRandomFloat(3.55, 6.77, 6);
