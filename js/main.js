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

const getAvatarUrls = (count = SIMILAR_USER_COUNT) => {
  const result = [];
  const userCountLength = count.toString().length;
  for (let i = 1; i <= count; i++) {
    result.push(`img/avatars/user${i.toString().padStart(userCountLength, '0')}.png`);
  }
  return result;
};

const arrayAvatarUrls = getAvatarUrls();

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => {
  const randomNum = getRandomPositiveInteger(0, elements.length - 1);
  return elements[randomNum];
};

function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getFeaturesLength = (arr) => {
  const randomLength = getRandomPositiveInteger(1, arr.length);
  return randomLength;
};

const createUser = (index) => {
  const locationLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const locationLng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: arrayAvatarUrls[index],
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

const createUsers = Array.from({length: SIMILAR_USER_COUNT},(_, index) => createUser(index));

console.log(createUsers);
