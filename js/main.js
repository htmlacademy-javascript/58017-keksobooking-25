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
  debounce,
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
import {
  filtersType,
  filtersPrice,
  filtersRooms,
  filtersGuests,
  filtersFeatures,
  renderFilteredCommonMarkers,
} from './filters.js';
import {
  loadPhoto,
} from './photos.js';

const RERENDER_DELAY = 500;

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
    filtersType.addEventListener('change', debounce(() => renderFilteredCommonMarkers(cards), RERENDER_DELAY));
    filtersPrice.addEventListener('change', debounce(() => renderFilteredCommonMarkers(cards), RERENDER_DELAY));
    filtersRooms.addEventListener('change', debounce(() => renderFilteredCommonMarkers(cards), RERENDER_DELAY));
    filtersGuests.addEventListener('change', debounce(() => renderFilteredCommonMarkers(cards), RERENDER_DELAY));
    filtersFeatures.addEventListener('change', debounce(() => renderFilteredCommonMarkers(cards), RERENDER_DELAY));
    loadPhoto();
  },
  () => showAlert('Не удалось загрузить данные с сервера'),
);

setUserFormSubmit(showSuccessMessage);
