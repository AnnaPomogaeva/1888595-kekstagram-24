/* eslint-disable id-length */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
let form = document.querySelector('.img-upload__form');
let hashTagInput = form.querySelector('.text__hashtags');
let description = form.querySelector('.text__description');
let hashTagRegexp = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19})$/;

const checkDouble = (hashTags) => {
  let errorMessage = '';
  let count = {};
  let doubleHashTags = [];

  hashTags.forEach((i) => {
    count[i] = (count[i] || 0) + 1;
    if (count[i] >= 2 && !doubleHashTags.includes(i)) {
      doubleHashTags.push(i);
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
    hashTag.search(hashTagRegexp) === -1
      ? errorMessage += `Неверный хэштег ${hashTag}. `
      : errorMessage += '';

    hashTag.length > 20
      ? errorMessage += `Хэштег ${hashTag} больше 20 символов. `
      : errorMessage += '';
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
  let hashTags = hashTagInput.value.split(' ');
  let lowerCasehashTags = [];

  hashTags.forEach((hashTag) => {
    lowerCasehashTags.push(hashTag.toLowerCase());
  });

  let errorMessage = validateHashTags(lowerCasehashTags);
  errorMessage.length !== 0
    ? setRedBorder(hashTagInput)
    : removeRedBorder(hashTagInput);
  hashTagInput.setCustomValidity(errorMessage);
};
const onDescriptionChange = () => {
  if (description.value.length > 140) {
    setRedBorder(description);
    description.setCustomValidity('Длина описания должна быть не больше 140 символов');
  } else {
    removeRedBorder(description);
  }
};
description.addEventListener('change', onDescriptionChange);
hashTagInput.addEventListener('change', onHashTagInputChange);
