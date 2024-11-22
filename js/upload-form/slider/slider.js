import {uploadForm} from'../form.js';
import {EFFECTS} from'./slider-effects.js';

const slider = uploadForm.querySelector('.effect-level__slider');
const sliderValue = uploadForm.querySelector('.effect-level__value');

const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const effectsContainer = uploadForm.querySelector('.img-upload__effects');
const uploadPreview = uploadForm.querySelector('.img-upload__preview');

const [previewImage] = uploadPreview.children;

const DEFAULT_STEP = 0.1;

function createSlider() {
  sliderContainer.classList.add('hidden');
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    step: DEFAULT_STEP,
    start: 1,
    format:{
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
}

function sliderToValue (target){
  sliderValue.value = slider.noUiSlider.get();
  previewImage.style.filter = EFFECTS[target].effect(sliderValue.value);
}

effectsContainer.addEventListener('change', (evt) => {
  const effectTarget = evt.target.value;
  slider.noUiSlider.off('update', sliderUpdate);

  if(evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    previewImage.style.removeProperty('filter');
    return;
  }
  if (sliderContainer.classList.contains(('hidden'))) {
    sliderContainer.classList.remove('hidden');
  }
  previewImage.style.filter = EFFECTS[effectTarget].effect(EFFECTS[effectTarget].range.max);

  function sliderUpdate() {
    sliderToValue(effectTarget);
  }

  slider.noUiSlider.updateOptions({
    range: EFFECTS[effectTarget].range,
    start: EFFECTS[effectTarget].range.max,
    step: (effectTarget !== 'marvin') ? DEFAULT_STEP : EFFECTS[effectTarget].step,
  });
  slider.noUiSlider.on('update', sliderUpdate);
});

function defaultSliderValue (){
  slider.noUiSlider.destroy();
  previewImage.style.removeProperty('filter');
  uploadForm.querySelector('#effect-none').checked = true;
}


export {createSlider,slider,sliderValue,previewImage ,defaultSliderValue};
