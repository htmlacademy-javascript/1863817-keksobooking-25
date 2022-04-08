const getRandomInteger = (min, max) => {

  if ((min || max) < 0 || max < min || (min || max) % 1 !== 0)  {
    return 'При выборе диапозона допущена ошибка.';
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getRandomInteger(1, 50);

const getRandomFloat = (min, max, numberAfterDot) => {

  if ((min || max) < 0 || max < min || (min || max) % 1 === 0)  {
    return 'При выборе диапозона допущена ошибка.';
  }

  const digitsDegree  = 10 ** numberAfterDot;

  return (Math.floor((Math.random() * (max - min) + min) * digitsDegree) + Math.round(Math.random())) / digitsDegree;
};

getRandomFloat(6.76, 6.77, 2);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const eventListenerForDocumentClick = (event, message) => {
  message.remove();
  document.removeEventListener(event, eventListenerForDocumentClick);
};

export {
  getRandomInteger,
  getRandomFloat,
  showAlert,
  debounce,
  eventListenerForDocumentClick,
};
