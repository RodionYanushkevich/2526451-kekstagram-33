import {isEscapeKey, compensateOverflowPadding} from '../util.js';
import {addListner,removeListner} from '../big-picture/big-picture-events.js';

import { createSlider,defaultSliderValue } from './slider/slider.js';
import {defaultImgScaleValues} from'./scale-handler.js';

import {setUserFormSubmit, uploadForm,defaultFormValues} from'./form.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = uploadOverlay.querySelector('.img-upload__cancel');
const inpustArea = uploadForm.querySelector('.img-upload__text');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

function stopFormEscKeyDownEvent (evt) {
  if (isEscapeKey(evt)) {
    evt.target.blur();
    evt.stopPropagation();
  }
}

function openModalWindow () {
  compensateOverflowPadding(true);

  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  removeListner();
  document.addEventListener('keydown', onDocumentKeydown);
  inpustArea.addEventListener('keydown', stopFormEscKeyDownEvent);
  createSlider();
}

function closeModalWindow () {
  compensateOverflowPadding(false);
  uploadOverlay.classList.add('hidden');

  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  inpustArea.removeEventListener('keydown', stopFormEscKeyDownEvent);

  addListner();
  defaultImgScaleValues();
  defaultFormValues();
  defaultSliderValue();
}

setUserFormSubmit(closeModalWindow);

overlayCloseButton.addEventListener('click', closeModalWindow) ;

export {onDocumentKeydown,openModalWindow};
