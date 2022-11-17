import {getRandomArrayElement, getRandomPositiveInteger, getRandomPositiveFloat} from './util.js';

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

const getAdvertisement = () => {
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

const createAdvertisement = () => Array.from({length: 10}, getAdvertisement);

export {createAdvertisement};
