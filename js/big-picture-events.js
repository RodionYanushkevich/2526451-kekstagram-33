import { isEscapeKey } from './util.js';
import {pictures} from './generate-pictures.js';
import {generateComment} from './generate-comments-template.js';
// Окно
const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureWindowCloseBtn = bigPictureWindow.querySelector('.big-picture__cancel');
const bigPictureImage = bigPictureWindow.querySelector('.big-picture__img').children[0];
// Счетчики
const likesCount = bigPictureWindow.querySelector('.likes-count');
const commentShownCount = bigPictureWindow.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPictureWindow.querySelector('.social__comment-total-count');
const commentsTotalCountContainer = bigPictureWindow.querySelector('.social__comment-count');
const commentsLoader = bigPictureWindow.querySelector('.comments-loader');

const pictureDescription = bigPictureWindow.querySelector('.social__caption');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureWindow();
  }
};

function openBigPictureWindow () {
  bigPictureWindow.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
}

function closeBigPictureWindow () {
  bigPictureWindow.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

function onPictureClick (evt) {

  if (evt.target.nodeName === 'IMG') {
    const target = evt.target.parentElement;

    const [targetImage, { children: [newComentsCount, newLikesCount] }] = target.children;
    openBigPictureWindow();

    bigPictureImage.src = targetImage.src;
    commentShownCount.textContent = '3?';

    commentsTotalCount.textContent = newComentsCount.textContent;
    likesCount.textContent = newLikesCount.textContent;

    pictureDescription.textContent = targetImage.alt;

    generateComment(targetImage.src);

    // убираем счетчики
    commentsTotalCountContainer.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    /* eslint-disable */
    console.log('src Img:', targetImage.src);
   /* eslint-enable */

  }
}
bigPictureWindowCloseBtn.addEventListener('click', closeBigPictureWindow);

pictures.addEventListener('click', onPictureClick);
