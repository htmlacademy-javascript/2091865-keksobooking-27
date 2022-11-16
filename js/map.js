import {createCard} from './card.js';
//import {createAdvertisement} from './data.js';//
import {activePage} from './filter.js';

const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const coordinate = {
  lat: 35.68351,
  lng: 139.76757
};

// создает карту
const map = L.map('map-canvas').on('load', () => {
  activePage(true);
}).setView({
  coordinate
}, 10);//настройка зума

//добавляет слой с картой
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({ //иконка маркера
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52], //ее координаты
});

const pinIcon = L.icon({ //добавляет иконку синюю?
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    coordinate
  },
  {
    draggable: true, //метку можно передвигать по карте
    icon: mainPinIcon, //добавлчем изображение маркера
  },
  address.value = `${coordinate.lat} ${coordinate.lng}`
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (offers) => { //ф-ция готовит все маркеры и собирает в группу
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.lat,
        lng: offer.lng
      },
      {
        icon: pinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(createCard(offer));
  });
};

mainPinMarker.on('moveend', (evt) => {
  const getCoordinate = evt.target.getLatLng();
  address.value = `${getCoordinate.lat.toFixed(5)} ${getCoordinate.lng.toFixed(5)}`;
});

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

//сбрасывает
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    coordinate});

  map.setView({
    coordinate});
});

setOnMapLoad();
createMarkers();

