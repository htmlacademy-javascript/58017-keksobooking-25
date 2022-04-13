const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.key === 'Escape';
const once = {
  once : true
};

const closeModalWindowEscKeyDown = (item) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      item.remove();
    }
  }, once);
};

const closeModalWindowOnClick = (item) => {
  document.addEventListener('click', () => {
    item.remove();
  }, once);
};

const showErrorMessage = () => {
  const showError = errorTemplate.cloneNode(true);
  const errorModalCloseElement = showError.querySelector('.error__button');

  errorModalCloseElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showError.remove();
  });

  closeModalWindowEscKeyDown(showError);

  closeModalWindowOnClick(showError);

  body.append(showError);
};

const showSuccessMessage = () => {
  const showSuccess = successTemplate.cloneNode(true);

  closeModalWindowEscKeyDown(showSuccess);

  closeModalWindowOnClick(showSuccess);

  body.append(showSuccess);
};

export {
  showErrorMessage,
  showSuccessMessage
};
