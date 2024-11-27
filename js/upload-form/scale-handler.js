import { uploadForm } from './form.js';
import { previewImage } from './slider/slider.js';

const SCALE_DIVISOR = 100;

const DEFAULT_SCALE_TRANSFORM_VALUE = 1;

const SCALE_RULES = {
  step: 0.25,
  maxPictureSize: 1,
  minPictureSize: 0.25
};


const scaleContainer = uploadForm.querySelector('.img-upload__scale');
const [zoomOutBtn, scaleValueInput, zoomInBtn] = scaleContainer.children;

scaleValueInput.value = `${DEFAULT_SCALE_TRANSFORM_VALUE * SCALE_DIVISOR}%`;

let formattedScaleValue = DEFAULT_SCALE_TRANSFORM_VALUE;

const updateScale = () => {
  previewImage.style.transform = `scale(${formattedScaleValue})`;
  scaleValueInput.value = `${(formattedScaleValue * SCALE_DIVISOR)}%`;
  scaleValueInput.setAttribute('value', scaleValueInput.value);
};

const setDefaultScaleValue = () => {
  formattedScaleValue = DEFAULT_SCALE_TRANSFORM_VALUE;
  updateScale();
};

scaleContainer.addEventListener('click', (evt) => {
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
  updateScale();
});


export { setDefaultScaleValue };
