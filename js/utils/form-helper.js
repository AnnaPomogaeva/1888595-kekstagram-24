/* eslint-disable id-length */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
import { clearPhotoEffects } from './photo-edit-helper.js';
import './form-validation-helper.js';

const form = document.querySelector('.img-upload__form');

const onFullscreenEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement.classList.contains('text__hashtags')
      || document.activeElement.classList.contains('text__description')) {
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    closeForm();
  }
};

const showPicturePrewiev = (inputElement) => {
  if (inputElement.files.length === 0) {
    return;
  }
  document.querySelector('.img-upload__preview img').src = window.URL.createObjectURL(inputElement.files[0]);
};
const openForm = (evt) => {
  form.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.img-upload__preview img').style.transform = 'scale(1)';
  document.addEventListener('keydown', onFullscreenEscKeydown);
  showPicturePrewiev(evt.target);
};
const closeForm = () => {
  form.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  form.querySelector('.img-upload__input').value = '';
  document.removeEventListener('keydown', onFullscreenEscKeydown);
  document.querySelector('.scale__control--value').value = '100%';
  form.querySelector('.text__hashtags').value = '';
  form.querySelector('.text__description').value = '';
  clearPhotoEffects();
};
form.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  openForm(evt);
});
form.querySelector('.img-upload__cancel').addEventListener('click', closeForm);

const onSmallerScaleClick = () => {
  const scaleVal = document.querySelector('.scale__control--value').value;
  const smallerScaleVal = parseInt(scaleVal, 10) - 25;
  if (smallerScaleVal < 25) {
    return;
  }

  document.querySelector('.img-upload__preview img').style.transform = `scale(${smallerScaleVal / 100})`;
  document.querySelector('.scale__control--value').value = `${smallerScaleVal}%`;
};
form.querySelector('.scale__control--smaller').addEventListener('click', onSmallerScaleClick);

const onBiggerScaleClick = () => {
  const scaleVal = document.querySelector('.scale__control--value').value;
  const biggerScaleVal = parseInt(scaleVal, 10) + 25;
  if (biggerScaleVal > 100) {
    return;
  }

  document.querySelector('.img-upload__preview img').style.transform = `scale(${biggerScaleVal / 100})`;
  document.querySelector('.scale__control--value').value = `${biggerScaleVal}%`;
};
form.querySelector('.scale__control--bigger').addEventListener('click', onBiggerScaleClick);

const closeSuccessMessage = () => {
  const SuccessMessage = document.querySelector('.success');
  SuccessMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onOuterSuccessMessageClick);
};

function onSuccessMessageButtonClick() {
  closeSuccessMessage();
}

function onSuccessMessageEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

function onOuterSuccessMessageClick(evt) {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
}

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content;
  const successMessagePattern = successMessageTemplate.querySelector('.success');
  const successMessage = successMessagePattern.cloneNode(true);
  successMessage.querySelector('.success__button').addEventListener('click', onSuccessMessageButtonClick);
  document.addEventListener('click', onOuterSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.querySelector('body').appendChild(successMessage);
};

const closeFailMessage = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onFailMessageEscKeydown);
  document.removeEventListener('click', onOuterFailPopupClick);
};

function onFailMessageButtonClick() {
  closeFailMessage();
}

function onFailMessageEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeFailMessage();
  }
}

function onOuterFailPopupClick(evt) {
  if (!evt.target.closest('.error__inner')) {
    closeFailMessage();
  }
}

const showFailMessage = () => {
  const failMessageTemplate = document.querySelector('#error').content;
  const failMessagePattern = failMessageTemplate.querySelector('.error');
  const failMessage = failMessagePattern.cloneNode(true);
  failMessage.querySelector('.error__button').addEventListener('click', onFailMessageButtonClick);
  document.addEventListener('click', onOuterFailPopupClick);
  document.addEventListener('keydown', onFailMessageEscKeydown);
  document.querySelector('body').appendChild(failMessage);
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          showSuccessMessage();
        } else {
          showFailMessage();
        }
      })
      .catch(() => {
        showFailMessage();
      });

    closeForm();
  });
};

setUserFormSubmit();

export { openForm };
