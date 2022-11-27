import {activatePage} from './page-filter.js';
import {createCard} from './card.js';
import { getFilteredOffers, onFiltersChange } from './map-filter.js';
import { getData } from './api.js';
import {showAlert} from './util.js';

const coordinate = {
  lat: 35.68351,
  lng: 139.76757,
};

const zoom = 10;

const address = document.querySelector('#address');

const map = L.map('map-canvas');

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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onDataLoad = (data) => {
  createMarkers(getFilteredOffers(data));
  activatePage();
};

const onDataFailed = () => {
  showAlert('Не удалось загрузить объявления.');
};

const setFilteredMarkers = () => {
  getData((offers) => {
    createMarkers(getFilteredOffers(offers));
    onFiltersChange(debounce(() => {
      markerGroup.clearLayers();
      createMarkers(getFilteredOffers(offers));
    }));
  }, onDataFailed);
};

const showMap = () => {
  map.on('load', () => {
    activatePage(true);
    setFilteredMarkers();
  });
  map.setView(coordinate, zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

mainPinMarker.on('moveend', (evt) => {
  const getCoordinate = evt.target.getLatLng();
  address.value = `${getCoordinate.lat.toFixed(5)} ${getCoordinate.lng.toFixed(5)}`;
});

const setMainPinMarker = () => {
  mainPinMarker.setLatLng(
    coordinate);

  map.setView(
    coordinate,
    zoom);
};

const resetMap = () => {
  setMainPinMarker();
  map.closePopup();
  markerGroup.clearLayers();
  address.value = `${coordinate.lat} ${coordinate.lng}`;
  getData(onDataLoad, onDataFailed);
};

export{resetMap, onDataLoad, showMap};
