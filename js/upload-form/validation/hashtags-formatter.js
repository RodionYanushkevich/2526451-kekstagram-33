import {hashtagsInput} from'../form.js';

function hashtagsFormatter(hashtagsArray) {
  const newHashtags = [];

  for (let i = hashtagsArray.length - 1; i >= 0; i--) {
    if (hashtagsArray[i].trim() === '') {
      hashtagsArray.splice(i, 1);
    }
  }

  for (let i = 0; i < hashtagsArray.length; i++) {
    let newHashtag = ((hashtagsArray[i].replace(/#/g, ' #'))).trim();

    if (newHashtag[0] !== '#') {
      newHashtag = `#${ newHashtag}`;
    }

    if (newHashtag.includes(' ')) {
      const splitedHashtagsArray = newHashtag.split(' ');
      splitedHashtagsArray.forEach((hashtag) => {
        const trimmed = hashtag.trim();
        newHashtags.push(trimmed);
      });

    } else {
      newHashtags.push(newHashtag);
    }
  }

  return newHashtags;
}

hashtagsInput.addEventListener('focus', () => {
  if (hashtagsInput.value === '') {
    hashtagsInput.value = '#';
  }
});

hashtagsInput.addEventListener('focusout', () => {
  if (hashtagsInput.value === '#') {
    hashtagsInput.value = '';
  }
});

hashtagsInput.addEventListener('change', () => {
  const hastTagsArray = hashtagsInput.value.split(' ');
  hashtagsInput.value = hashtagsFormatter(hastTagsArray).join(' ');
});
