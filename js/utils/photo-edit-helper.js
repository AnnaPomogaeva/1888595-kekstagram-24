const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview img');
const effectInputs = form.querySelectorAll('input[name="effect"]');
const slider = form.querySelector('.effect-level__slider');

const onEffectChange = () => {
  const effect = form.querySelector('input[name="effect"]:checked').value;
  if (effect === 'none') {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
  slider.noUiSlider.set(100);
};
effectInputs.forEach((element) => {
  element.addEventListener('change', onEffectChange);
});
const clearPhotoEffects = () => {
  imgPreview.classList = '';
  imgPreview.style.webkitFilter = '';
  imgPreview.style.filter = '';
  slider.classList.add('hidden');
};
const updateCssFilterStyle = (value) => {
  const effect = form.querySelector('input[name="effect"]:checked').value;
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
    case 'none':
      clearPhotoEffects();
      break;
    default:
      imgPreview.classList = '';
      break;
  }
};
const onChangeSliderValue = () => {
  const value = slider.noUiSlider.get();
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
    connect: 'lower',
  });

  slider.noUiSlider.on('update', onChangeSliderValue);
  slider.classList.add('hidden');
};
createSlider();

export { clearPhotoEffects };
