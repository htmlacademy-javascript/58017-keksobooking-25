const similarUserTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const setElementValue = (selector, attribute, value, elem) => {
  const element = elem.querySelector(selector);
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
  setElementValue('.popup__avatar', 'src', author.avatar, userElement);
  setElementValue('.popup__title', 'textContent', offer.title, userElement);
  setElementValue('.popup__text--address', 'textContent', offer.address, userElement);
  setElementValue('.popup__text--price', 'textContent', `${offer.price} ₽/ночь`, userElement);
  setElementValue('.popup__text--capacity', 'textContent', `${offer.rooms} комнаты для ${offer.guests} гостей`, userElement);
  setElementValue('.popup__text--time', 'textContent', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`, userElement);
  setElementValue('.popup__description', 'textContent', offer.description, userElement);
  setElementValue('.popup__photo', 'src', offer.photos, userElement);
  setElementValue('.popup__type', 'textContent', housingType[offer.type], userElement);
  const featuresContainer = userElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    if (offer.features === undefined) {
      featuresListItem.classList.add('hidden');
    } else {
      const isNecessary = offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    }
  });

  return userElement;
};

export {addElementsPopup};
