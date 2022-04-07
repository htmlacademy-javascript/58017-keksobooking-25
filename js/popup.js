import {createUsers} from './data.js';

const similarListElement = document.querySelector('#map-canvas');
const similarUserTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarUsers = createUsers();

const similarListFragment = document.createDocumentFragment();

similarUsers.forEach(({author, offer}) => {
  const userElement = similarUserTemplate.cloneNode(true);
  userElement.querySelector('.popup__avatar').src = author.avatar;
  userElement.querySelector('.popup__title').textContent = offer.title;
  userElement.querySelector('.popup__text--address').textContent = offer.address;
  userElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  userElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} + комнаты для + ${offer.guests} + гостей`;
  userElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  userElement.querySelector('.popup__description').textContent = offer.description;
  userElement.querySelector('.popup__photo').src = offer.photos;
  const housingType = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  userElement.querySelector('.popup__type').textContent = housingType[offer.type];
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
});

similarListElement.append(similarListFragment);
