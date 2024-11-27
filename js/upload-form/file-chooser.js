import {openModalWindow} from'./form-events.js';
import {uploadForm} from'./form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];


const fileChooser = uploadForm.querySelector('.img-upload input[type="file"]');
const preview = uploadForm.querySelector('.img-upload__preview img');
const thumbnailPreviews = uploadForm.querySelectorAll('.effects__preview');

const fileChoose = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);

    thumbnailPreviews.forEach((thumbnailPreview) => {
      thumbnailPreview.style.backgroundImage = `url(${preview.src})`;
    });
    openModalWindow();
  }
};

fileChooser.addEventListener('change',fileChoose);
export { fileChooser, preview };
