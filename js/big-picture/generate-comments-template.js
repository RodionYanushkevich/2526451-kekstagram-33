import { photoDataArray } from '../data-fetcher.js';

const newCommentArea = document.querySelector('.social__comments');

const commentContainer = document.createDocumentFragment();

const generateComments = (pictureSrc) => {
  newCommentArea.innerHTML = '';

  const formattedPath = pictureSrc.substring(pictureSrc.indexOf('photos/'));

  const pictureData = photoDataArray.find((imgUrl) => imgUrl.url === formattedPath);

  pictureData.comments.forEach ((comment) => {
    const newCommentTemplate = document.createElement('LI');
    newCommentTemplate.classList.add('social__comment');

    const newCommentImage = document.createElement('IMG');
    newCommentImage.classList.add('social__picture');
    newCommentImage.setAttribute('src', comment.avatar);
    newCommentImage.setAttribute('alt', comment.name);
    newCommentImage.setAttribute('width', '35');
    newCommentImage.setAttribute('height', '35');
    newCommentTemplate.appendChild(newCommentImage);

    const newCommentDescription = document.createElement('P');
    newCommentDescription.classList.add('social__text');
    newCommentDescription.textContent = comment.message;
    newCommentTemplate.appendChild(newCommentDescription);

    commentContainer.appendChild(newCommentTemplate);
  });

  newCommentArea.appendChild(commentContainer);
};

export { generateComments };
