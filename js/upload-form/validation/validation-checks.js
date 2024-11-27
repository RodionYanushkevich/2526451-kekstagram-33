const MAX_HASHTAGS = 5;

const HASHTAG_REGEX = /^#[a-zа-я0-9]{1,19}$/i;

let errorMesages = [ ];

const hasDuplicateHashtags = (hashtagsArray) => {
  const noDuplicate = {};
  for (let i = 0; i < hashtagsArray.length; i++) {
    const hashtag = hashtagsArray[i].toLowerCase();
    if (!noDuplicate[hashtag]) {
      noDuplicate[hashtag] = true;
    } else {
      return false;
    }
  }
  return true;
};

const getErrorsMessages = () => errorMesages.join(', ');

const cleanErrorsMessages = () => {
  errorMesages = [];
  return errorMesages;
};

const validateHashtagsInput = (value) => {
  if (value) {
    const hashtagsArray = value.trim().split(/\s+/);

    const allHashtagsRegularValid = hashtagsArray.every((hashTag) => HASHTAG_REGEX.test(hashTag));
    const noDuplicateHashtags = hasDuplicateHashtags(hashtagsArray);
    const maxHashtagsValid = hashtagsArray.length <= MAX_HASHTAGS;

    const hashtagsValidationErrorsObj = [
      { isValid: allHashtagsRegularValid, message: 'введён невалидный хэштег' },
      { isValid: noDuplicateHashtags, message: 'хэштеги повторяются' },
      { isValid: maxHashtagsValid, message: 'превышено количество хэштегов' }
    ];

    hashtagsValidationErrorsObj.forEach(({isValid, message})=>{
      if (!isValid) {
        errorMesages.push(message);
      }
    });
    return allHashtagsRegularValid && noDuplicateHashtags && maxHashtagsValid;
  }
  return true;
};

export {validateHashtagsInput, getErrorsMessages,cleanErrorsMessages};
