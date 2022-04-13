import { sendData } from './api.js';
import { showErrorMessage } from './util.js';

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

disableForm();

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

const validationAmount = () => {
  const housingTypeElement = type.value;
  return amountField.value >= housingType[housingTypeElement].min && amountField.value <= housingType[housingTypeElement].max;
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
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['не для гостей']
};

const validatePlacement = () => placementOptions[guestsField.value].includes(roomsField.value);

const getPlacementErrorMessage = () => {
  if (guestsField.value === '100') {
    return 'Не для гостей';
  }
  return `
  ${guestsField.value}
  ${guestsField.value === '1' ? 'комната' : 'комнаты'} максимум для
  ${placementOptions[guestsField.value][0]}
  ${placementOptions[guestsField.value][0] === '1' ? 'гостя' : 'гостей'}
  `;
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

const submitButton = form.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          form.reset();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {
  setUserFormSubmit,
  disableForm,
  enableForm
};
