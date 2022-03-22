const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_USER_COUNT = 10;

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getFeaturesLength = (arr) => getRandomPositiveInteger(1, arr.length);

const createUser = (index) => {
  const locationLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const locationLng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${index.toString().padStart(2, 0)}.png`,
    },
    offer: {
      title: 'Наше предложение',
      address: `${locationLat} ${locationLng}`,
      price: getRandomPositiveInteger(1000, 10000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(1, 6),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: shuffle(FEATURES).slice(0, getFeaturesLength(FEATURES)),
      description: 'Здесь будет описание',
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    }
  };
};

const createUsers = () => Array.from({length: SIMILAR_USER_COUNT},(_, index) => createUser(index + 1));

createUsers();
