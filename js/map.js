import {activePage} from './filter.js';
import {createCard} from './card.js';
//import {createAdvertisement} from './data.js';

const coordinate = {
  lat: 35.68351,
  lng: 139.76757,
};

const zoom = 10;

const address = document.querySelector('#address');

// создает карту
const map = L.map('map-canvas')
  .on('load', () => {
    activePage(true);
  })
  .setView(coordinate, zoom);

//добавлят слой
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({ //иконка маркера
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52], //ее координаты
});

const pinIcon = L.icon({ //добавляет иконку синюю?
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  coordinate,
  {
    draggable: true, //метку можно передвигать по карте
    icon: mainPinIcon, //добавлчем изображение маркера
  },
  address.value = `${coordinate.lat} ${coordinate.lng}`
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng
      },
      {
        icon: pinIcon,
      }
    );
    marker
      .addTo(markerGroup)
      .bindPopup(createCard(offer));
  });
};

//const offers = createAdvertisement();
//offers.forEach((offer) => {
//createMarkers(offer);
//});

//const onDataLoad = (offers) => {
//createMarkers(offers);
//activePage(true);
//};

const onDataLoad = (offers) => {
  const offersCount = 10;
  markerGroup.clearLayers();
  createMarkers(offers.slice(0, offersCount));
  activePage(true);
};

mainPinMarker.on('moveend', (evt) => {
  const getCoordinate = evt.target.getLatLng();
  address.value = `${getCoordinate.lat.toFixed(5)} ${getCoordinate.lng.toFixed(5)}`;
});

const resetMap = () => {
  mainPinMarker.setLatLng(
    coordinate);

  map.setView({
    coordinate, zoom});
  address.value = `${coordinate.lat} ${coordinate.lng}`;
};

export{resetMap, createMarkers, onDataLoad};
