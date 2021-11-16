/* eslint-disable prefer-const */
import { openFullscreenPhoto } from './open-fullscreen-photo.js';
import { getPicturesData } from '../data/data-helper.js';

let template = document.querySelector('#picture').content;
let pictureTemplate = template.querySelector('a');
let pictures = document.querySelector('.pictures');

let fragment = document.createDocumentFragment();

const onErrorButtonClick = () => {
  document.querySelector('.error').remove();
};
let onPicturesGetError = (error) => {
  let errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = error.message;
  errorElement.querySelector('.error__button').textContent = 'закрыть';
  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.querySelector('body').appendChild(errorElement);

};

let onPicturesReady = (picturesData) => {
  picturesData.forEach((templatePic) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = templatePic.url;
    picture.querySelector('.picture__likes').textContent = templatePic.likes;
    picture.querySelector('.picture__comments').textContent = templatePic.comments.length;
    picture.addEventListener('click', (evt) => {
      openFullscreenPhoto(evt, templatePic);
    });
    fragment.appendChild(picture);
  });

  pictures.appendChild(fragment);
};

let renderPictures = () => {
  getPicturesData(onPicturesReady, onPicturesGetError);
};

export { renderPictures };
