import { sendData } from './api.js';
import { resetImages } from './avatar.js';
import {resetMap} from './map.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const typeOfHouse = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const mapFilters = document.querySelector('.map__filters');

const maxPrice = 100000;
const minLength = 30;
const maxLength = 100;

const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const guestsToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};


const pristine = new Pristine(form , {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const validateCapacity = () => roomsToGuests[roomNumberElement.value].includes(capacityElement.value);

const getCapacityError = () =>
  `Указанное количество комнат вмещает ${roomsToGuests[roomNumberElement.value].join(' или ')}  число гостей`;
const getRoomsNumberError = () =>
  `Для указанного количества гостей требуется ${guestsToRooms[capacityElement.value].join(' или ')} комнаты`;

pristine.addValidator(roomNumberElement, validateCapacity, getRoomsNumberError);
pristine.addValidator(capacityElement, validateCapacity, getCapacityError);

const onRoomsNumberChange = () => {
  pristine.validate(roomNumberElement);
  pristine.validate(capacityElement);
};

const onCapacityChange = () => {
  pristine.validate(roomNumberElement);
  pristine.validate(capacityElement);
};

roomNumberElement.addEventListener('change', onRoomsNumberChange);
capacityElement.addEventListener('change', onCapacityChange);

const validateTitle = (value) => value.length >= minLength && value.length <= maxLength;

pristine.addValidator(title, validateTitle, 'от 30 до 100 символов');

const validatePrice = (value) => value <= maxPrice && value >= minPrices[typeOfHouse.value];
const getPriceErrorMessage = (value) => {
  if (value < minPrices[typeOfHouse.value]) {
    return `Минимальная цена для этого типа жилья ${minPrices[typeOfHouse.value]} руб.`;
  }
};

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

price.placeholder = minPrices[typeOfHouse.value];

typeOfHouse.addEventListener('change', () => {
  price.placeholder = minPrices[typeOfHouse.value];
});

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: price.placeholder,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('change', () => {
  price.value = sliderElement.noUiSlider.get();
  pristine.validate(price);
});

price.addEventListener('change', () => sliderElement.noUiSlider.set(price.value));

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);

timeOut.addEventListener('change', onTimeOutChange);

form.addEventListener('change', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const blockButtonSubmit = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};
const unlockButtonSubmit = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setOnFormReset = () => {
  form.reset();
  mapFilters.reset();
  resetMap();
  pristine.reset();
  sliderElement.noUiSlider.reset();
  resetImages();
};

const onSendSuccess = () => {
  showSuccessMessage();
  setOnFormReset();
};
const onSendFail = () => {
  showErrorMessage();
};

const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    if (pristine.validate()) {
      blockButtonSubmit();
      sendData(
        () => {
          onSuccess();
          unlockButtonSubmit();
        },
        () => {
          onFail();
          unlockButtonSubmit();
        }, formData);
    }
  });
};

setUserFormSubmit(onSendSuccess, onSendFail);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setOnFormReset();
});
