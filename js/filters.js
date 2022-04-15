import {
  removeMarkers,
  setMarkers,
} from './map.js';
import {
  addElementsPopup,
} from './popup.js';

const filtersForm = document.querySelector('.map__filters');
const filtersType = filtersForm.querySelector('#housing-type');
const filtersPrice = filtersForm.querySelector('#housing-price');
const filtersRooms = filtersForm.querySelector('#housing-rooms');
const filtersGuests = filtersForm.querySelector('#housing-guests');
const filtersFeatures = filtersForm.querySelector('#housing-features');
const featureCheckbox = filtersFeatures.querySelectorAll('.map__checkbox');

const DEFAULT_TYPE_FILTER_VALUE = 'any';
const MAX_MARKERS_COUNT_ON_MAP = 10;
const MAX_PRICE = 50000;
const MIN_PRICE = 10000;

const filterPriceType = {
  low: 'low',
  middle: 'middle',
  high: 'high'
};

const filterByType = (card) => {
  if (filtersType.value === DEFAULT_TYPE_FILTER_VALUE) {
    return true;
  }
  return card.offer.type === filtersType.value;
};

const filterByPrice = (card) => {
  const currentPrice = filtersPrice.value;
  switch (currentPrice) {
    case DEFAULT_TYPE_FILTER_VALUE:
      return true;
    case filterPriceType.low:
      return card.offer.price < MIN_PRICE;
    case filterPriceType.middle:
      return MIN_PRICE <= card.offer.price && card.offer.price <= MAX_PRICE;
    case filterPriceType.high:
      return card.offer.price > MAX_PRICE;
  }
};

const filterByRooms = (card) => {
  if (filtersRooms.value === DEFAULT_TYPE_FILTER_VALUE) {
    return true;
  }
  return +card.offer.rooms === +filtersRooms.value;
};

const filterByGuests = (card) => {
  if (filtersGuests.value === DEFAULT_TYPE_FILTER_VALUE) {
    return true;
  }
  return +card.offer.guests === +filtersGuests.value;
};

const filterByFeatures = (card) => {
  const { offer } = card;

  let checkedCount = 0;
  let featuresCheckedCount = 0;
  featureCheckbox.forEach((item) => {
    if (item.checked) {
      checkedCount += 1;
      const isInclude = offer.features && offer.features.includes(item.value);
      if (isInclude) {
        featuresCheckedCount += 1;
      }
    }
  });

  if (checkedCount === featuresCheckedCount) {
    return true;
  }
};

const renderFilteredCommonMarkers = (сards) => {
  removeMarkers();

  const filteredCards = [];
  for (const card of сards) {
    if (filterByType(card) &&
      filterByPrice(card) &&
      filterByRooms(card) &&
      filterByGuests(card) &&
      filterByFeatures(card)) {
      filteredCards.push(card);
    }
    if (filteredCards.length === MAX_MARKERS_COUNT_ON_MAP) {
      break;
    }
  }

  setMarkers(filteredCards, addElementsPopup);
};

export {
  filtersType,
  filtersPrice,
  filtersRooms,
  filtersGuests,
  filtersFeatures,
  renderFilteredCommonMarkers,
};
