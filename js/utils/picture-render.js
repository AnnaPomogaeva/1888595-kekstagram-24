import { generateTemporaryData } from '../data/temporary-data-helper.js';

const TEMPLATE = document.querySelector('#picture').content;
const PICTURE_TEMPLATE = TEMPLATE.querySelector('a');
const PICTURES = document.querySelector('.pictures');

const FRAGMENT = document.createDocumentFragment();

const TEMPORARY_DATA = generateTemporaryData();

function renderPictures() {
  TEMPORARY_DATA.forEach((templatePic) => {
    const picture = PICTURE_TEMPLATE.cloneNode(true);
    picture.querySelector('.picture__img').src = templatePic.url;
    picture.querySelector('.picture__likes').textContent = templatePic.likes;
    picture.querySelector('.picture__comments').textContent = templatePic.comments.length;
    FRAGMENT.appendChild(picture);
  });

  PICTURES.appendChild(FRAGMENT);
}

export { renderPictures };
