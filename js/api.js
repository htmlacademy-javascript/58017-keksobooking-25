const ACADEMY_API_HOST = 'https://25.javascript.pages.academy';
const ACADEMY_API_GET_DATA = `${ACADEMY_API_HOST}/keksobooking/data`;
const ACADEMY_API_SEND = `${ACADEMY_API_HOST}/keksobooking`;

const getData = (onSuccess, onError) => {
  fetch(ACADEMY_API_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError();
    })
    .then(onSuccess)
    .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    ACADEMY_API_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
