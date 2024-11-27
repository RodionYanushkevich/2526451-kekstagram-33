
import {commentsLoader, getCommentsList, commentShownCount} from './big-picture-events.js';

const COMMENTS_TO_SHOW = 5;
const INITIAL_COMMENTS_TO_SHOW = 5;


let displayedCommentsCount = INITIAL_COMMENTS_TO_SHOW;

const hideCommentsOnLoadBigPicture = (commentsList) => {
  displayedCommentsCount = INITIAL_COMMENTS_TO_SHOW;

  commentsList.forEach ((comment, index) => {
    if (index >= INITIAL_COMMENTS_TO_SHOW) {
      comment.classList.add('hidden');
    }
  });
};

const getCommentShownCount = (commentsList) => {
  if (commentsList.length < displayedCommentsCount) {
    commentShownCount.textContent = commentsList.length;
  } else {
    commentShownCount.textContent = INITIAL_COMMENTS_TO_SHOW;
  }
};

const showNextComments = () => {
  const commentsList = getCommentsList();

  if (displayedCommentsCount < commentsList.length) {
    for (let i = displayedCommentsCount; i < displayedCommentsCount + COMMENTS_TO_SHOW && i < commentsList.length ; i++) {
      commentsList[i].classList.remove('hidden');
    }
  }
  displayedCommentsCount += COMMENTS_TO_SHOW;
  commentShownCount.textContent = displayedCommentsCount;

  if (displayedCommentsCount >= commentsList.length) {
    commentShownCount.textContent = commentsList.length;
    commentsLoader.classList.add('hidden');
    displayedCommentsCount = INITIAL_COMMENTS_TO_SHOW;
  }
};

export {hideCommentsOnLoadBigPicture, showNextComments , getCommentShownCount,INITIAL_COMMENTS_TO_SHOW};
