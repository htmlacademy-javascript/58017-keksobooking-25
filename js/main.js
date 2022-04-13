import {
  addElementsPopup,
} from './popup.js';
import {
  disableForm,
  setUserFormSubmit,
  enableForm,
} from './form.js';
import './slider.js';
import {
  showAlert,
  showSuccessMessage,
} from './util.js';
import {
  map,
  startLat,
  startLtg,
  setMarkers,
} from './map.js';
import './reset-form.js';
import {
  getData
} from './api.js';

disableForm();

map.on('load', () => {
  enableForm();
}).setView({
  lat: startLat,
  lng: startLtg,
}, 13);

getData(
  (cards) => {
    setMarkers(cards.slice(0, 10), addElementsPopup);
  },
  showAlert('Не удалось загрузить данные с сервера'),
);

setUserFormSubmit(showSuccessMessage);
