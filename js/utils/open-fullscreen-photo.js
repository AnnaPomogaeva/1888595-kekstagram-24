/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const renderComment = (comment) => {
  let commentTemplate = document.querySelector('.big-picture .social__comment').cloneNode(true);
  commentTemplate.querySelector('.social__picture').src = comment.avatar;
  commentTemplate.querySelector('.social__picture').alt = comment.name;
  commentTemplate.querySelector('.social__text').textContent = comment.message;
  document.querySelector('.big-picture .social__comments').append(commentTemplate);
};

const renderFullscreenPhoto = (photo) => {
  let bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__social .likes-count').textContent = photo.likes;
  bigPicture.querySelector('.big-picture__social .comments-count').textContent = photo.comments.lenght;
  bigPicture.querySelector('.big-picture__social .social__caption').textContent = photo.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  photo.comments.forEach((comment) => {
    renderComment(comment);
  });

  bigPicture.classList.remove('hidden');
};

const onFullscreenEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const clearComments = () => {
  document.querySelector('.big-picture .social__comments').innerHTML = '';
};


function closeBigPicture() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearComments();

  document.removeEventListener('keydown', onFullscreenEscKeydown);
}

const openFullscreenPhoto = (evt, photo) => {
  evt.preventDefault();
  renderFullscreenPhoto(photo);

  document.addEventListener('keydown', onFullscreenEscKeydown);
};

document.querySelector('.big-picture .big-picture__cancel').addEventListener('click', closeBigPicture);

export { openFullscreenPhoto };
