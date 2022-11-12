const adFormElement = document.querySelector('.ad-form');
const adFormFieldset = adFormElement.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterSelects = mapFilter.querySelectorAll('select');
const mapFilterFieldsets = mapFilter.querySelector('fieldset');

const disabledPage = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');

  adFormFieldset.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  mapFilterSelects.forEach((filter) => {
    filter.disabled = true;
  });

  mapFilterFieldsets.disabled = true;
};

disabledPage();

const activePage = () => {
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

activePage();

