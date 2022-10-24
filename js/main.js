// Функции взяты из интернета и доработаны
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return NaN;
  }
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b)); // округление в меньшую
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result); // округление в нижнюю сторону
}

function getRandomPositiveFloat(a, b, digits = 1) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return NaN;
  }
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

getRandomPositiveInteger(1, 0);
getRandomPositiveFloat(0, 1, 2);

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

//напишите необходимые функции для создания массива из 10 сгенерированных JS-объектов
const TITLE_ADS = [
  'Дворец в центре города',
  'Квартира посуточно',
  'Дом для компании',
  'Бунгало',
  'Уютный отель',
];

const APARTMENT_TYPE = [
  'palace', 'flat', 'house', 'bungalow', 'hotel'
];

const TIME = [
  '12:00', '13:00', '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAdvertisement = () => {
  const latCoordinate = getRandomPositiveFloat(35.65000, 35.70000, 4);
  const lngCoordinate = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${String(getRandomPositiveInteger(1, 10)).padStart(2, '0')}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLE_ADS),
      address: `${latCoordinate}, ${lngCoordinate}`,
      price: getRandomPositiveInteger(1000, 100000),
      type: getRandomArrayElement(APARTMENT_TYPE),
      rooms: getRandomPositiveInteger(1, 1000),
      guests: getRandomPositiveInteger(1, 15),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features:  FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length)),
      description: 'Уютное, чистое помещение',
      photos: PHOTOS.slice(0, getRandomPositiveInteger(0, PHOTOS.length))
    },
    location: {
      lat: latCoordinate,
      lng: lngCoordinate,
    }
  };
};

const similarAdvertisement = Array.from({length: 10}, createAdvertisement);
similarAdvertisement();


