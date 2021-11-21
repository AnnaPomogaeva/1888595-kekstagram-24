import {checkStringLength} from './check-string-length.js';

const HASHTAG_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const hashTagInput = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const hashTagRegexp = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19})$/;

const checkDouble = (hashTags) => {
  let errorMessage = '';
  const count = {};
  const doubleHashTags = [];

  hashTags.forEach((index) => {
    count[index] = (count[index] || 0) + 1;
    if (count[index] >= 2 && !doubleHashTags.includes(index)) {
      doubleHashTags.push(index);
    }
  });

  doubleHashTags.forEach((hashTag) => {
    errorMessage += `Хэштег ${hashTag} использован несколько раз. `;
  });

  return errorMessage;
};

const validateHashTags = (hashTags) => {
  let errorMessage = '';

  if (hashTags && hashTags.length > 5) {
    errorMessage += 'Хэштегов не может быть больше 5. ';
  }

  hashTags.forEach((hashTag) => {
    errorMessage += hashTag.search(hashTagRegexp) === -1
      ? `Неверный хэштег ${hashTag}. `
      : '';

    errorMessage += checkStringLength(hashTag, HASHTAG_MAX_LENGTH)
      ? ''
      : `Хэштег ${hashTag} больше ${HASHTAG_MAX_LENGTH} символов. `;
  });

  errorMessage += checkDouble(hashTags);

  return errorMessage;
};

const setRedBorder = (element) => {
  element.style.borderWidth = '2px';
  element.style.borderColor = 'red';
};
const removeRedBorder = (element) => {
  element.style.borderWidth = '';
  element.style.borderColor = '';
};

const onHashTagInputChange = () => {
  const hashTags = hashTagInput.value.split(' ');
  const lowerCasehashTags = [];

  hashTags.forEach((hashTag) => {
    lowerCasehashTags.push(hashTag.toLowerCase());
  });

  const errorMessage = validateHashTags(lowerCasehashTags);
  errorMessage.length !== 0
    ? setRedBorder(hashTagInput)
    : removeRedBorder(hashTagInput);
  hashTagInput.setCustomValidity(errorMessage);
};
const onDescriptionChange = () => {
  if (checkStringLength(description.value, DESCRIPTION_MAX_LENGTH)) {
    removeRedBorder(description);
  } else {
    setRedBorder(description);
    description.setCustomValidity(`Длина описания должна быть не больше ${DESCRIPTION_MAX_LENGTH} символов`);
  }
};
description.addEventListener('change', onDescriptionChange);
hashTagInput.addEventListener('change', onHashTagInputChange);
