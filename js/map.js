import {activatePage} from './page-filter.js';
import {createCard} from './card.js';

const coordinate = {
  lat: 35.68351,
  lng: 139.76757,
};

const zoom = 10;

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage(true);
  })
  .setView(coordinate, zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  coordinate,
  {
    draggable: true,
    icon: mainPinIcon,
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

const onDataLoad = (offers) => {
  const offersCount = 10;
  markerGroup.clearLayers();
  createMarkers(offers.slice(0, offersCount));
  activatePage(true);
};

mainPinMarker.on('moveend', (evt) => {
  const getCoordinate = evt.target.getLatLng();
  address.value = `${getCoordinate.lat.toFixed(5)} ${getCoordinate.lng.toFixed(5)}`;
});

const setMainPinMarker = () => {
  mainPinMarker.setLatLng(
    coordinate);

  map.setView(
    coordinate, zoom);
};

const resetMap = () => {
  setMainPinMarker();
  map.closePopup();
  markerGroup.clearLayers();
  address.value = `${coordinate.lat} ${coordinate.lng}`;
};

export{resetMap, createMarkers, onDataLoad};
