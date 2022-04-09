import {createUsers} from './data.js';

const similarListElement = document.querySelector('#map-canvas');
const similarUserTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarUsers = createUsers();

const similarListFragment = document.createDocumentFragment();

const setElementValue = (selector, attribute, value) => {
  const element = userElement.querySelector(selector);
  if (value) {
    element[attribute] = value;
  } else {
    element.classList.add('hidden');
  }
};

const housingType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addElementsPopup = ({author, offer}) => {
  const userElement = similarUserTemplate.cloneNode(true);
  setElementValue('.popup__avatar', 'src', author.avatar);
  setElementValue('.popup__title', 'textContent', offer.title);
  setElementValue('.popup__text--address', 'textContent', offer.address);
  setElementValue('.popup__text--price', 'textContent', `${offer.price} ₽/ночь`);
  setElementValue('.popup__text--capacity', 'textContent', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  setElementValue('.popup__text--time', 'textContent', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  setElementValue('.popup__description', 'textContent', offer.description);
  setElementValue('.popup__photo', 'src', offer.photos);
  setElementValue('.popup__type', 'textContent', housingType[offer.type]);
  const featuresContainer = userElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary = offer.features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
  similarListFragment.append(userElement);
};

similarListElement.append(similarListFragment);
