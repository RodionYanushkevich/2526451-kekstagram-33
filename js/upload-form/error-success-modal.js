import {isEscapeKey} from '../util.js';
import {onDocumentKeydown} from './form-events.js';

const onErrorSuccessModalKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeAllertModal();
  }
};

const getWindow = (sentDataStatus) => {
  const allertTemplate = document.querySelector(sentDataStatus).content.cloneNode(true);

  const [allertSection] = allertTemplate.children;
  const [allertModalDiv] = allertSection.children;
  const [,allertBtn] = allertModalDiv.children;

  allertSection.addEventListener('click' , (evt) => {
    if (evt.target === allertBtn || !allertModalDiv.contains(evt.target)) {
      closeAllertModal();
    }
  });
  return allertSection;
};

const showErrorSuccessModal = (status) => {
  const allertSection = getWindow(status);

  document.body.appendChild(allertSection);

  if (allertSection.classList.contains('hidden')) {
    allertSection.classList.remove('hidden');
  }

  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorSuccessModalKeydown);
};

function closeAllertModal () {
  document.removeEventListener('keydown', onErrorSuccessModalKeydown);
  if (!document.body.lastChild.classList.contains('success')) {
    document.addEventListener('keydown', onDocumentKeydown);
  }
  document.body.lastChild.remove();
}

export { showErrorSuccessModal };
