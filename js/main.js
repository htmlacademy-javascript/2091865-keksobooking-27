import './card.js';
import './user-form.js';
import './map.js';
import './page-filter.js';
import {getData} from './api.js';
import {onDataLoad} from './map.js';
import { showAlert } from './util.js';

getData(onDataLoad, showAlert);//написали что сообщение не показывает. (По пункту 5.2 необходимо показывать сообщение. Сейчас это просто пустой красный прямоугольник)
