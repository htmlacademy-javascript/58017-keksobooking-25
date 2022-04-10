const startLat = 35.68218;
const startLtg = 139.75358;

const map = L.map('map-canvas')
  .setView({
    lat: startLat,
    lng: startLtg,
  }, 15);

map.on('load', () => {
  console.log('text');
});

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

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// const createCustomPopup = (point) => {
//   const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
//   const popupElement = balloonTemplate.cloneNode(true);

//   popupElement.querySelector('.popup__title').textContent = point.title;
//   popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.lat}, ${point.lng}`;
// };

// points.forEach((point) => {
//   const {lat, lng} = point;
//   const marker = L.marker({
//     lat,
//     lng,
//   }, {
//     icon,
//   }, );

//   marker
//     .addTo(map)
//     .bindPopup(createCustomPopup(point));
// });

export {
  mainPinMarker,
  address,
  startLat,
  startLtg,
  map,
};
