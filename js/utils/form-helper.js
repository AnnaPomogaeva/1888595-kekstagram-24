import { clearPhotoEffects } from './photo-edit-helper.js';
import './form-validation-helper.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const form = document.querySelector('.img-upload__form');
const imageElement = document.querySelector('.img-upload__preview img');
const imageUploadOverlayElement = form.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const scaleValueElement = document.querySelector('.scale__control--value');

const closeForm = () => {
  imageUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  form.reset();
  scaleValueElement.value = '100%';
  clearPhotoEffects();
};
const showPicturePrewiev = (inputElement) => {
  if (inputElement.files.length === 0) {
    return;
  }
  imageElement.src = window.URL.createObjectURL(inputElement.files[0]);
};
const openForm = (evt) => {
  imageUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  scaleValueElement.value = '100%';
  imageElement.style.transform = 'scale(1)';
  document.addEventListener('keydown', function handler(ev) {
    if (ev.key === 'Escape') {
      if (document.activeElement.classList.contains('text__hashtags')
        || document.activeElement.classList.contains('text__description')) {
        ev.stopPropagation();
        return;
      }
      ev.preventDefault();
      closeForm();
      this.removeEventListener('keydown', handler);
    }
  });
  showPicturePrewiev(evt.target);
};

form.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  openForm(evt);
});
form.querySelector('.img-upload__cancel').addEventListener('click', closeForm);

const onSmallerScaleClick = () => {
  const scaleVal = scaleValueElement.value;
  const smallerScaleVal = parseInt(scaleVal, 10) - SCALE_STEP;
  if (smallerScaleVal < MIN_SCALE) {
    return;
  }

  imageElement.style.transform = `scale(${smallerScaleVal / 100})`;
  scaleValueElement.value = `${smallerScaleVal}%`;
};
form.querySelector('.scale__control--smaller').addEventListener('click', onSmallerScaleClick);

const onBiggerScaleClick = () => {
  const scaleVal = scaleValueElement.value;
  const biggerScaleVal = parseInt(scaleVal, 10) + SCALE_STEP;
  if (biggerScaleVal > MAX_SCALE) {
    return;
  }

  imageElement.style.transform = `scale(${biggerScaleVal / 100})`;
  scaleValueElement.value = `${biggerScaleVal}%`;
};
form.querySelector('.scale__control--bigger').addEventListener('click', onBiggerScaleClick);

const closeSuccessMessage = () => {
  document.querySelector('.success').remove();
};

function onSuccessMessageButtonClick() {
  closeSuccessMessage();
}

function onSuccessMessageEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
    evt.target.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
}

function onOuterSuccessMessageClick(evt) {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
    evt.target.removeEventListener('click', onOuterSuccessMessageClick);
  }
}

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content;
  const successMessagePattern = successMessageTemplate.querySelector('.success');
  const successMessage = successMessagePattern.cloneNode(true);
  successMessage.querySelector('.success__button').addEventListener('click', onSuccessMessageButtonClick);
  document.addEventListener('click', onOuterSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  bodyElement.appendChild(successMessage);
};

const closeFailMessage = () => {
  document.querySelector('.error').remove();
};

function onFailMessageButtonClick() {
  closeFailMessage();
}

function onFailMessageEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeFailMessage();
    evt.target.removeEventListener('keydown', onFailMessageEscKeydown);
  }
}

function onOuterFailPopupClick(evt) {
  if (!evt.target.closest('.error__inner')) {
    closeFailMessage();
    evt.target.removeEventListener('click', onOuterFailPopupClick);
  }
}

const showFailMessage = () => {
  const failMessageTemplate = document.querySelector('#error').content;
  const failMessagePattern = failMessageTemplate.querySelector('.error');
  const failMessage = failMessagePattern.cloneNode(true);
  failMessage.querySelector('.error__button').addEventListener('click', onFailMessageButtonClick);
  document.addEventListener('click', onOuterFailPopupClick);
  document.addEventListener('keydown', onFailMessageEscKeydown);
  bodyElement.appendChild(failMessage);
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
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
