import './data.js';
import './popup.js';
import {
  disableForm,
  enableForm,
} from './form.js';
import './slider.js';
import {
  map,
  startLat,
  startLtg,
} from './map.js';
import './reset-form.js';

disableForm();

map.on('load', () => {
  enableForm();
}).setView({
  lat: startLat,
  lng: startLtg,
}, 13);
