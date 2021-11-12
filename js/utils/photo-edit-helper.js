/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
let form = document.querySelector('.img-upload__form');
let imgPreview = form.querySelector('.img-upload__preview img');
let effectInputs = form.querySelectorAll('input[name="effect"]');
let slider = form.querySelector('.effect-level__slider');

const onEffectChange = () => {
  slider.noUiSlider.set(100);
};
effectInputs.forEach((element) => {
  element.addEventListener('change', onEffectChange);
});

const updateCssFilterStyle = (value) => {
  let effect = form.querySelector('input[name="effect"]:checked').value;
  value = parseInt(value, 10);
  switch (effect) {
    case 'chrome':
      imgPreview.classList = '';
      imgPreview.classList.add('effects__preview--chrome');
      imgPreview.style.webkitFilter = `grayscale(${(value / 100).toFixed(1)})`;
      imgPreview.style.filter = `grayscale(${(value / 100).toFixed(1)})`;
      break;
    case 'sepia':
      imgPreview.classList = '';
      imgPreview.classList.add('effects__preview--sepia');
      imgPreview.style.webkitFilter = `sepia(${(value / 100).toFixed(1)})`;
      imgPreview.style.filter = `sepia(${(value / 100).toFixed(1)})`;
      break;
    case 'marvin':
      imgPreview.classList = '';
      imgPreview.classList.add('effects__preview--marvin');
      imgPreview.style.webkitFilter = `invert(${Math.round(value)}%)`;
      imgPreview.style.filter = `invert(${Math.round(value)}%)`;
      break;
    case 'phobos':
      imgPreview.classList = '';
      imgPreview.classList.add('effects__preview--phobos');
      imgPreview.style.webkitFilter = `blur(${(value * 3 / 100).toFixed(1)}px)`;
      imgPreview.style.filter = `blur(${(value * 3 / 100).toFixed(1)}px)`;
      break;
    case 'heat':
      imgPreview.classList = '';
      imgPreview.classList.add('effects__preview--heat');
      imgPreview.style.webkitFilter = `brightness(${(value * 3 / 100).toFixed(1)})`;
      imgPreview.style.filter = `brightness(${(value * 3 / 100).toFixed(1)})`;
      break;
    default:
      imgPreview.classList = '';
      break;
  }
};
const onChangeSliderValue = () => {
  let value = slider.noUiSlider.get();
  form.querySelector('.effect-level__value').value = value;
  updateCssFilterStyle(value);
};
const createSlider = () => {
  noUiSlider.create(slider, {
    start: [100],
    range: {
      'min': [0],
      'max': [100],
    },
  });

  slider.noUiSlider.on('update', onChangeSliderValue);
};
createSlider();
