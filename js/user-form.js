import { sendData } from './api.js';
import {resetMap} from './map.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const typeOfHouse = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');

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

const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',//класс элемента в котором выведется ошибка
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

//валидация комнат и гостей

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

//валидация title
function validateTitle (value) {
  return title.length >= 30 && value.length <= 100;
}

pristine.addValidator(title, validateTitle, 'от 30 до 100 символов');//чтобы описать валидации 2/ вторым аргументом - функция проверки 1= элемент формы для валидации 3= сообщение об ошибке

//валидация цены
function validatePrice (value) {
  return value <= 100000 && value >= minPrices[typeOfHouse.value];
}

function getPriceErrorMessage (value) {
  if (value < minPrices[typeOfHouse.value]) {
    return `Минимальная цена для этого типа жилья ${minPrices[typeOfHouse.value]} руб.`;
  }
}

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

price.placeholder = minPrices[typeOfHouse.value];

typeOfHouse.addEventListener('change', () => {
  price.placeholder = minPrices[typeOfHouse.value];
});

//слайдер
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
  price.value = sliderElement.noUiSlider.get(); //вернет значение
  pristine.validate(price);
});

price.addEventListener('change', () => sliderElement.noUiSlider.set(price.value));

//время заезда и выезда
const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);

timeOut.addEventListener('change', onTimeOutChange);

const resetForm = () => {
  form.reset();
  sliderElement.noUiSlider.set(price.value);
};

//отправляет форму
const blockButtonSubmit = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockButtonSubmit = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// const setOnFormSubmit = (cb) => {
//   form.addEventListener('submit', async (evt) => {
//     evt.preventDefault();
//     const isValid = pristine.validate();
//     if (isValid) {
//       blockButtonSubmit();
//       await cb(new FormData(form));
//       unblockButtonSubmit();
//     }
//   });
// };
const setOnFormReset = () => {
  form.reset();
  mapFilters.reset();
  resetMap();
  pristine.reset();
};

// const onSendFail = () => {
//   showErrorMessage();
// };

// const onSendDataSuccess = () => {
//   setOnFormReset();
//   showSuccessMessage();
// };

const onSendSuccess = () => {
  showSuccessMessage();
  setOnFormReset();
  unblockButtonSubmit();
};

const onSendError = () => {
  showErrorMessage();
  unblockButtonSubmit();
};

const setOnFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockButtonSubmit();
    sendData(
      onSendSuccess,
      onSendError,
      new FormData(evt.target),
    );
  }
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setOnFormReset();
});

export{setOnFormReset, setOnFormSubmit, resetForm};
