import './data.js';
import {
  addElementsPopup,
} from './popup.js';
import {
  disableForm,
  enableForm,
} from './form.js';
import './slider.js';
import {
  map,
  startLat,
  startLtg,
  setMarkers,
} from './map.js';
import './reset-form.js';
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
    setMarkers(cards, addElementsPopup);
  }
);
