/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import './photo-edit-helper.js';
import './form-validation-helper.js';
let form = document.querySelector('.img-upload__form');
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
const openForm = (evt) => {
  form.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.img-upload__preview img').style.transform = 'scale(1)';
  document.addEventListener('keydown', onFullscreenEscKeydown);
};
const closeForm = () => {
  form.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  form.querySelector('.img-upload__input').value = '';
  document.removeEventListener('keydown', onFullscreenEscKeydown);
};
form.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  openForm(evt);
});
form.querySelector('.img-upload__cancel').addEventListener('click', closeForm);

const onSmallerScaleClick = (evt) => {
  let scaleVal = document.querySelector('.scale__control--value').value;
  let smallerScaleVal = parseInt(scaleVal, 10) - 25;
  if (smallerScaleVal < 25) {
    return;
  }

  document.querySelector('.img-upload__preview img').style.transform = `scale(${smallerScaleVal / 100})`;
  document.querySelector('.scale__control--value').value = `${smallerScaleVal}%`;
};
form.querySelector('.scale__control--smaller').addEventListener('click', onSmallerScaleClick);

const onBiggerScaleClick = (evt) => {
  let scaleVal = document.querySelector('.scale__control--value').value;
  let biggerScaleVal = parseInt(scaleVal, 10) + 25;
  if (biggerScaleVal > 100) {
    return;
  }

  document.querySelector('.img-upload__preview img').style.transform = `scale(${biggerScaleVal / 100})`;
  document.querySelector('.scale__control--value').value = `${biggerScaleVal}%`;
};
form.querySelector('.scale__control--bigger').addEventListener('click', onBiggerScaleClick);

export { openForm };
