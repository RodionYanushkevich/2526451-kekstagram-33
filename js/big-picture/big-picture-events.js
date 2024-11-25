import { isEscapeKey,compensateOverflowPadding } from '../util.js';
import {picturesSection} from '../generate-pictures.js';

import {generateComments } from './generate-comments-template.js';
import { hideCommentsOnLoadBigPicture,showNextComments , getCommentShownCount, INITIAL_COMMENTS_TO_SHOW} from './comments-functions.js';


const bigPictureWindow = document.querySelector('.big-picture');
const commentShownCount = bigPictureWindow.querySelector('.social__comment-shown-count');

const bigPictureWindowCloseBtn = bigPictureWindow.querySelector('.big-picture__cancel');
const bigPictureImage = bigPictureWindow.querySelector('.big-picture__img').children[0];
const likesCount = bigPictureWindow.querySelector('.likes-count');
const commentsTotalCount = bigPictureWindow.querySelector('.social__comment-total-count');

const pictureDescription = bigPictureWindow.querySelector('.social__caption');

const commentsLoader = bigPictureWindow.querySelector('.comments-loader');
const commentInput = bigPictureWindow.querySelector('.social__footer-text');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureWindow();
  }
};
function blockBigPictureEscEvent (evt){
  if (isEscapeKey(evt)) {
    evt.target.blur();
    evt.stopPropagation();
  }
}


function getCommentsList () {
  return bigPictureWindow.querySelectorAll('.social__comment');
}

function openBigPictureWindow () {
  compensateOverflowPadding(true);

  bigPictureWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentInput.addEventListener('keydown',blockBigPictureEscEvent);
  commentsLoader.addEventListener ('click', showNextComments);
}

function closeBigPictureWindow () {
  compensateOverflowPadding(false);

  bigPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener ('click', showNextComments);
  commentInput.removeEventListener('keydown',blockBigPictureEscEvent);

  commentInput.value = '';
}

function hideCommentsLoader (commentsList) {
  if (commentsList.length <= INITIAL_COMMENTS_TO_SHOW) {
    commentsLoader.classList.add('hidden');
  } else if (commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.remove('hidden');
  }
}

function removeListner () {
  picturesSection.removeEventListener('click', onPictureClick);
}

function addListner () {
  picturesSection.addEventListener('click', onPictureClick);
}

function onPictureClick (evt) {
  if (evt.target.nodeName === 'IMG') {
    const target = evt.target.parentElement;

    const [targetImage, { children: [newComentsCount, newLikesCount] }] = target.children;

    generateComments(targetImage.src);
    const commentsList = getCommentsList ();

    hideCommentsOnLoadBigPicture(commentsList);

    openBigPictureWindow();

    const imageUrl = new URL(targetImage.src);

    bigPictureImage.src = imageUrl.pathname.slice(1);
    commentsTotalCount.textContent = newComentsCount.textContent;

    likesCount.textContent = newLikesCount.textContent;
    pictureDescription.textContent = targetImage.alt;

    getCommentShownCount(commentsList);
    hideCommentsLoader(commentsList);
  }
}

bigPictureWindowCloseBtn.addEventListener('click', closeBigPictureWindow);
picturesSection.addEventListener('click', onPictureClick);

export {getCommentsList, commentsLoader, commentShownCount, removeListner, addListner};
