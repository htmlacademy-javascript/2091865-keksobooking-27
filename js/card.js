const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const offerDescription = (cardElement, description) => {
  const descriptionElement = cardElement.querySelector('.popup__description');
  if (description && description.length) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }
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

const createCard = ({author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('[data-price]').textContent = offer.price;
  cardElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = cardElement.querySelector('.popup__features');
  const featuresItems = featuresList.querySelectorAll('.popup__feature');
  if (offer.features) {
    featuresItems.forEach((featuresItem) => {
      const modifier = offer.features.some((feature) => featuresItem.classList.contains(`popup__feature--${feature}`));

      if (modifier) {
        featuresItem.remove();
      }
    });
  } else {
    featuresList.remove();
  }

  offerDescription(cardElement, offer.description);
  offerPhotos(cardElement, offer.photos, offer.title);
  return cardElement;
};

export{createCard};
