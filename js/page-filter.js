const adFormElement = document.querySelector('.ad-form');
const adFormFieldset = adFormElement.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterSelects = mapFilter.querySelectorAll('select');
const mapFilterFieldsets = mapFilter.querySelector('fieldset');

const activatePage = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');

  adFormFieldset.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  mapFilterSelects.forEach((filter) => {
    filter.disabled = false;
  });

  mapFilterFieldsets.disabled = false;

};

export {activatePage};
