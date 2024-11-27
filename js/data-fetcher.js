const TIMEOUT_DELETE_ERROR_SECTION = 5000;
const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/';

import { generatePictures} from'./generate-pictures.js';

const sortMenu = document.querySelector('.img-filters');

const errorTemplate = document.querySelector('#data-error').content;

const photoDataPromise = fetch(`${SERVER_URL}data`,
  {
    method:'GET'
  }
).then((response) => {
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }
  return response.json();
});

let photoDataArray;

photoDataPromise
  .then((photoData) => {
    generatePictures(photoData);
    sortMenu.classList.remove('img-filters--inactive');

    photoDataArray = photoData;
  })
  .catch(showErrorModal);

function sendData (onSuccess, onFail, body){
  fetch(SERVER_URL,
    {
      method:'POST',
      body,
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('ошибка');
    }
  }) .catch(() => {
    onFail('ошибка');
  });

}

function showErrorModal() {
  const errorModal = errorTemplate.cloneNode(true);
  const errorModalSection = errorModal.children[0];

  document.body.appendChild(errorModalSection);
  setTimeout(() => {
    document.body.lastChild.remove();
  }, TIMEOUT_DELETE_ERROR_SECTION);
}
export {photoDataPromise,sendData, photoDataArray};
