/* eslint-disable prefer-const */
import { generateTemporaryData } from '../data/temporary-data-helper.js';

let template = document.querySelector('#picture').content;
let pictureTemplate = template.querySelector('a');
let pictures = document.querySelector('.pictures');

let fragment = document.createDocumentFragment();

const temporaryData = generateTemporaryData();

function renderPictures() {
  temporaryData.forEach((templatePic) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = templatePic.url;
    picture.querySelector('.picture__likes').textContent = templatePic.likes;
    picture.querySelector('.picture__comments').textContent = templatePic.comments.length;
    fragment.appendChild(picture);
  });

  pictures.appendChild(fragment);
}

export { renderPictures };
