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
const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  showAlert,
  showErrorMessage,
  showSuccessMessage
};
