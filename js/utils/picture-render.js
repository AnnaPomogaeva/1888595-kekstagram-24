import { openFullscreenPhoto } from './open-fullscreen-photo.js';
import { getPicturesData } from '../data/data-helper.js';

const template = document.querySelector('#picture').content;
const pictureTemplate = template.querySelector('a');
const pictures = document.querySelector('.pictures');

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

const onPicturesReady = (picturesData) => {
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

const renderPictures = () => {
  getPicturesData(onPicturesReady, onPicturesGetError);
};

export { renderPictures };
