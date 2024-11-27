const pictureTemplate = document.querySelector('#picture').content;
const picturesSection = document.querySelector('.pictures');

const pictureContainer = document.createDocumentFragment();

const generatePictures = (photoDataArray) => {
  photoDataArray.forEach((picture) => {
    const newPicture = pictureTemplate.cloneNode(true);

    const newPictureImage = newPicture.querySelector('.picture__img');
    newPictureImage.src = picture.url;
    newPictureImage.alt = picture.description;

    const [comments, likes] = newPicture.querySelector('.picture__info').children;
    likes.textContent = picture.likes;
    comments.textContent = picture.comments.length;
    pictureContainer.appendChild(newPicture);
  });
  picturesSection.appendChild(pictureContainer);
};

export { picturesSection, generatePictures };
