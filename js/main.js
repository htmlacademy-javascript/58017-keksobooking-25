import {
  addElementsPopup,
} from './popup.js';
import {
  disableForm,
  setUserFormSubmit,
  enableForm,
} from './form.js';
import './slider.js';
import {showErrorMessage} from './util.js';
import {
  map,
  startLat,
  startLtg,
  setMarkers,
} from './map.js';
import {resetButton} from './reset-form.js';
import {
  getData,
  sendData,
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
  showErrorMessage('123'),
);

setUserFormSubmit(resetButton);
