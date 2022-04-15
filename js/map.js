const startLat = 35.68218;
const startLtg = 139.75358;

const map = L.map('map-canvas');
const layerGroup = L.layerGroup();
layerGroup.addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: startLat,
    lng: startLtg,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

const address = document.querySelector('#address');
address.value = `Широта ${startLat.toFixed(5)} Долгота ${startLtg.toFixed(5)}`;

mainPinMarker.on('moveend', (evt) => {
  const getLatLng = evt.target.getLatLng();
  address.value = `Широта ${getLatLng.lat.toFixed(5)} Долгота ${getLatLng.lng.toFixed(5)}`;
});

const COMMON_ICON = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const makePin = (card, popUpCollback) => {
  const marker = L.marker(
    [card.location.lat, card.location.lng], {
      icon: L.icon({
        iconUrl: COMMON_ICON.iconUrl,
        iconSize: COMMON_ICON.iconSize,
        iconAnchor: COMMON_ICON.iconAnchor,
      }),
      draggable: false
    }
  );
  marker.addTo(layerGroup);
  marker.bindPopup(() => popUpCollback(card));
};

const setMarkers = (cards, popUpCollback) => cards.forEach((card) => makePin(card, popUpCollback));
const removeMarkers = () => layerGroup.clearLayers();

export {
  mainPinMarker,
  address,
  startLat,
  startLtg,
  map,
  makePin,
  setMarkers,
  removeMarkers,
};
