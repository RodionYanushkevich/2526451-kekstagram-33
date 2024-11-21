import { uploadForm } from './form.js';
import { previewImage } from './slider/slider.js';

const scaleContainer = uploadForm.querySelector('.img-upload__scale');
const [zoomOutBtn, scaleValueInput, zoomInBtn] = scaleContainer.children;

const SCALE_DIVISOR = 100;

const SCALE_RULES = {
  step: 0.25,
  maxPictureSize: 1,
  minPictureSize: 0.25
};

const scaleValue = Number((scaleValueInput.value).replace('%',''));
let formattedScaleValue = (scaleValue / SCALE_DIVISOR);

scaleContainer.addEventListener('click', (evt) =>{
  if (evt.target === scaleValueInput){
    return;
  }
  evt.preventDefault();
  const STEP = SCALE_RULES.step;

  if (evt.target === zoomInBtn && formattedScaleValue < SCALE_RULES.maxPictureSize) {
    formattedScaleValue += STEP;
  }
  if (evt.target === zoomOutBtn && formattedScaleValue > SCALE_RULES.minPictureSize) {
    formattedScaleValue -= STEP;
  }

  previewImage.style.transform = `scale(${formattedScaleValue})`;

  scaleValueInput.value = `${(formattedScaleValue * SCALE_DIVISOR)}%`;

  scaleValueInput.setAttribute('value', scaleValueInput.value); //cypress иначе ругается
});

function defaultImgScaleValues() {
  previewImage.style.transform = `scale(${1})`;
  scaleValueInput.value = `${(100)}%`;
}

export {defaultImgScaleValues};
