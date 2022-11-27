const mapFilters = document.querySelector('.map__filters');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelector('#housing-features');

const minPrice = 10000;
const maxPrice = 50000;
const offersCount = 10;

const filterByType = (data) => typeFilter.value === data.offer.type || typeFilter.value === 'any';

const filterByPrice = (data) => {
  switch (priceFilter.value) {
    case 'any':
      return true;
    case 'low':
      return data.offer.price <= minPrice;
    case 'middle':
      return data.offer.price > minPrice && data.offer.price <= maxPrice;
    case 'high':
      return data.offer.price > maxPrice;
  }
};

const filterByRooms = (data) => roomsFilter.value === 'any' || data.offer.rooms === Number(roomsFilter.value);

const filterByGuests = (data) => guestsFilter.value === 'any' || data.offer.guests === Number(guestsFilter.value);

const filterByFeatures = (data) => {
  const checkedFeatures = Array.from(featuresFilter.querySelectorAll('[type="checkbox"]:checked'));
  const dataFeatures = data.offer.features;
  if (dataFeatures) {
    return checkedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
};

const getFilteredOffers = (offers) => {
  const filteredOffers = [];
  for (const offer of offers) {
    if(filteredOffers.length >= offersCount) {
      break;
    }
    if (
      filterByType(offer) &&
      filterByPrice(offer) &&
      filterByRooms(offer) &&
      filterByGuests(offer) &&
      filterByFeatures(offer)
    ) {
      filteredOffers.push(offer);
    }
  }
  return filteredOffers;
};

const onFiltersChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export { getFilteredOffers, onFiltersChange };
