import { createAdvertisement } from './data.js';

const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); //нашли шаблон, записали в переменную. 2)обращаемся к содержимому

const createCardElement = createAdvertisement(); //функция генерации объявлений

const cardFragment = document.createDocumentFragment();// черный ящик

const offerDescription = (cardElement, description) => {
  const descriptionElement = cardElement.querySelector('.popup__description');
  if (description && description.length) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }
};

const offerFeatures = (cardElement, features) => {
  const featuresList = cardElement.querySelector('.popup__features');

  if(features.length === 0) {
    featuresList.remove();
    return;
  }

  const modifiers = features.map((feature)=>`popup__feature--${ feature}`);

  const fiatureItems = cardElement.querySelectorAll('.popup__feature');
  fiatureItems.forEach((featureItem) => {
    const modifier = featureItem.classList[1];
    if(!modifiers.includes(modifier)) {
      featureItem.remove();
    }
  });
};

const createPhoto = (photo, title) => {
  const photoElement = document.createElement('img');
  photoElement.classList.add('popup--photo');
  photoElement.src = photo;
  photoElement.alt = title;
  photoElement.width = '45';
  photoElement.height = '40';

  return photoElement;
};

const offerPhotos = (cardElement, photos, title) => {
  const photosList = cardElement.querySelector('.popup__photos');
  if (photos && photos.length) {
    photosList.innerHTML = '';
    photos.forEach((photo) => {
      const photoElement = createPhoto(photo, title);
      photosList.append(photoElement);
    });
  } else {
    photosList.remove();
  }
};


createCardElement.forEach (({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('[data-price]').textContent = offer.price;
  cardElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  offerDescription(cardElement, offer.description);
  offerFeatures(cardElement, offer.features);
  offerPhotos(cardElement, offer.photos, offer.title);
  cardFragment.appendChild(cardElement);
  return cardElement;
});

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cardFragment);
