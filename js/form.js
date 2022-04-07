const disableForm = () => {
  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  const elements = document.querySelectorAll('.map__filter, .map__checkbox, .ad-form__element');
  elements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

disableForm();

const enableForm = () => {
  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  const elements = document.querySelectorAll('.map__filter, .map__checkbox, .ad-form__element');
  elements.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

enableForm();
