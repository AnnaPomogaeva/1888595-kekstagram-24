import { pictureThumbnailClickHandler } from './open-fullscreen-photo.js';
import { getPicturesData } from '../data/data-helper.js';
import { getRandomPositiveInteger } from './get-random-positive-integer.js'
import { debounce } from './debounce.js';

const template = document.querySelector('#picture').content;
const pictureTemplate = template.querySelector('a');
const pictures = document.querySelector('.pictures');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
let picturesData = [];

const fragment = document.createDocumentFragment();

const onErrorButtonClick = () => {
  document.querySelector('.error').remove();
};
const onPicturesGetError = (error) => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = error.message;
  errorElement.querySelector('.error__button').textContent = 'закрыть';
  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.querySelector('body').appendChild(errorElement);

};
const showPictures = (data) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  data.forEach((templatePic) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = templatePic.url;
    picture.querySelector('.picture__likes').textContent = templatePic.likes;
    picture.querySelector('.picture__comments').textContent = templatePic.comments.length;
    picture.addEventListener('click', (evt) => {
      pictureThumbnailClickHandler(evt, templatePic);
    });
    fragment.appendChild(picture);
  });

  pictures.appendChild(fragment);
};
const setActiveFilterClass = (element) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
};
const defaultFilterButtonClickHandler = (evt, callback) => {
  setActiveFilterClass(evt.target);
  callback();
};
const randomFilterButtonClickHandler = (evt, callback) => {
  setActiveFilterClass(evt.target);
  callback();
};
const discussFilterButtonClickHandler = (evt, callback) => {
  setActiveFilterClass(evt.target);
  callback();
};
const setDefaultFilter = () => {
  showPictures(picturesData);
};
const setRandomFilter = () => {
  let notDoubleRandomIndexes = [];
  let notDoublePictures = [];
  while (notDoubleRandomIndexes.length < 10) {
    let randomValue = getRandomPositiveInteger(0, picturesData.length - 1);
    if (!notDoubleRandomIndexes.includes(randomValue)) {
      notDoubleRandomIndexes.push(randomValue);
      notDoublePictures.push(picturesData[randomValue]);
    }
  }
  showPictures(notDoublePictures);
};
const setDiscussedFilter = () => {
  let sortedPictures = picturesData.slice(0);
  sortedPictures.sort((a,b) => {
    return b.comments.length - a.comments.length;
  })
  showPictures(sortedPictures);
};

const onPicturesReady = (data) => {
  picturesData = data;
  showPictures(picturesData);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  defaultFilterButton.addEventListener('click', (evt) => {defaultFilterButtonClickHandler(evt, debounce(setDefaultFilter, 300))});
  randomFilterButton.addEventListener('click', (evt) => {randomFilterButtonClickHandler(evt, debounce(setRandomFilter, 300))});
  discussedFilterButton.addEventListener('click', (evt) => {discussFilterButtonClickHandler(evt, debounce(setDiscussedFilter, 300))});
};

const renderPictures = () => {
  getPicturesData(onPicturesReady, onPicturesGetError);
};

export { renderPictures };
