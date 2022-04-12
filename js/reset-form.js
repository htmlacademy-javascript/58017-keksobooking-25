import {
  mainPinMarker,
  address,
  startLat,
  startLtg,
  map,
} from './map.js';
import {
  sliderElement,
} from './slider.js';

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: startLat,
    lng: startLtg,
  });
  map.setView({
    lat: startLat,
    lng: startLtg,
  }, 13);
  sliderElement.noUiSlider.set(1000);
  address.value = `Широта ${startLat.toFixed(5)} Долгота ${startLtg.toFixed(5)}`;
});

export {resetButton};
