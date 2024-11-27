import {photoDataArray} from'./data-fetcher.js';
import {generatePictures,picturesSection} from'./generate-pictures.js';

const RANDOM_PICTURES_COUNT = 10;


const formFilter = document.querySelector('.img-filters__form');

const [defaultBtn, randomBtn, popularBtn] = formFilter.children;

function buttonsActiveClassToggle(evt) {
  [...formFilter.children].forEach((button) => {
    if (evt.target !== button) {
      button.classList.remove('img-filters__button--active');
    } else {
      button.classList.add('img-filters__button--active');
    }
  });
}

function shuffle(array) {
  const shuffledArray = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0,RANDOM_PICTURES_COUNT);
}

function sortByCommentCount (a,b) {
  return b.comments.length - a.comments.length;
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const deboucedGeneratePictures = debounce((array) => {
  const picturesImg = picturesSection.querySelectorAll('.picture');
  picturesImg.forEach((picture) => picture.remove());
  generatePictures(array);
});

function showDeafaultPictures(evt) {
  buttonsActiveClassToggle(evt);

  deboucedGeneratePictures(photoDataArray);
}

function showPopularPictures(evt) {
  buttonsActiveClassToggle(evt);
  const mostPopularItems = photoDataArray.slice();

  deboucedGeneratePictures(mostPopularItems.sort(sortByCommentCount));
}

function showRandomPictures(evt) {
  buttonsActiveClassToggle(evt);

  const shuffledArray = shuffle(photoDataArray);
  deboucedGeneratePictures(shuffledArray);
}


popularBtn.addEventListener('click', showPopularPictures);
defaultBtn.addEventListener('click', showDeafaultPictures);
randomBtn.addEventListener('click', showRandomPictures);
