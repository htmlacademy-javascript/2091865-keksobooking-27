import './card.js';
import './user-form.js';
import './map.js';
import './filter.js';
import {setOnFormSubmit} from './user-form.js';
import {getData, sendData} from './api.js';
import './message.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {setOnFormReset} from './user-form.js';
import {onDataLoad} from './map.js';

const onSendDataSuccess = () => {
  setOnFormReset();
  showSuccessMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

//const onGetDataSuccess = (offers) => {
//setAdPins(offers);
//activePage();
//};

getData(onDataLoad);
