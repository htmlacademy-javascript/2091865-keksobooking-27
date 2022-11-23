import './card.js';
import './user-form.js';
import './map.js';
import './filter.js';
import {getData} from './api.js';
import './message.js';
// import {showSuccessMessage, showErrorMessage} from './message.js';
// import {setOnFormReset, setOnFormSubmit} from './user-form.js';
import {onDataLoad} from './map.js';
import { showAlert } from './util.js';
import {setOnFormSubmit} from './user-form.js';


// const onSendDataSuccess = () => {
//   setOnFormReset();
//   showSuccessMessage();
// };

// setOnFormSubmit(async (data) => {
//   await sendData(onSendDataSuccess, showErrorMessage, data);
// });

//const onGetDataSuccess = (offers) => {
//setAdPins(offers);
//activePage();
//};

getData(onDataLoad, showAlert);
setOnFormSubmit();
