const disableForm = () => {
  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  const elements = document.querySelectorAll('.map__filter, .map__checkbox, .ad-form__element');
  elements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const enableForm = () => {
  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  const elements = document.querySelectorAll('.map__filter, .map__checkbox, .ad-form__element');
  elements.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

const form = document.querySelector('.ad-form');

const pristine = new Pristine (form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextPage: 'span',
  errorTextClass: 'ad-form__error'
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'от 30 до 100 символов'
);

const type = form.querySelector('#type');
const amountField = form.querySelector('#price');
const housingType = {
  bungalow: {
    min: 0,
    max: 1000
  },
  flat: {
    min: 1000,
    max: 3000
  },
  hotel: {
    min: 3000,
    max: 5000
  },
  house: {
    min: 5000,
    max: 10000
  },
  palace: {
    min: 10000,
    max: 100000
  }
};

const validationAmount = (value) => {
  const housingTypeElement = type.value;
  return value >= housingType[housingTypeElement].min && value <= housingType[housingTypeElement].max;
};

const getAmountErrorMessage = () => {
  const housingTypeElement = type.value;
  return `От ${housingType[housingTypeElement].min} до ${housingType[housingTypeElement].max}`;
};

pristine.addValidator(amountField, validationAmount, getAmountErrorMessage);
pristine.addValidator(type, validationAmount);

const onTypeChange = () => {
  const housingTypeElement = type.value;
  amountField.placeholder = housingType[housingTypeElement].min;
  pristine.validate(amountField);
};

type.addEventListener('change', onTypeChange);

const guestsField = form.querySelector('#room_number');
const roomsField = form.querySelector('#capacity');
const placementOptions = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

const validatePlacement = () => placementOptions[guestsField.value].includes(roomsField.value);

const getPlacementErrorMessage = () => {
  if (guestsField.value === '100 комнат') {
    return 'Не для гостей';
  }
  return `${guestsField.value} масимум ${placementOptions[guestsField.value][0]}`;
};

pristine.addValidator(guestsField, validatePlacement);
pristine.addValidator(roomsField, validatePlacement, getPlacementErrorMessage);

const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');

checkIn.addEventListener('change', () => {
  checkOut.value = checkIn.value;
});

checkOut.addEventListener('change', () => {
  checkIn.value = checkOut.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {
  disableForm,
  enableForm
};
