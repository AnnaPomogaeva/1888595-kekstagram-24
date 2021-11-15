/* eslint-disable id-length */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const updateCommentsCount = () => {
  let renderedCommentsCount = document.querySelectorAll('.big-picture .social__comment:not(.hidden)').length;
  document.querySelector('.big-picture .downloaded-comments-count').innerText = renderedCommentsCount;
};
const showComments = () => {
  let renderedComments = document.querySelectorAll('.big-picture .social__comment.hidden');

  for (let i = 0; i < 5; i++) {
    const comment = renderedComments[i];
    if (comment) {
      comment.classList.remove('hidden');
      document.querySelector('.big-picture .comments-loader').classList.remove('hidden');
    } else {
      document.querySelector('.big-picture .comments-loader').classList.add('hidden');
    }
  }
  updateCommentsCount();
};

const renderComments = (comments, template) => {
  comments.forEach((comment) => {
    renderComment(comment, template);
  });

  showComments();
};
const renderComment = (commentData, commentTemplate) => {
  let comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__picture').alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;
  comment.classList.add('hidden');
  document.querySelector('.big-picture .social__comments').append(comment);
};

const renderFullscreenPhoto = (photo) => {
  let bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__social .likes-count').textContent = photo.likes;
  bigPicture.querySelector('.big-picture__social .comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.big-picture__social .social__caption').textContent = photo.description;
  document.querySelector('body').classList.add('modal-open');
  let commentTemplate = document.querySelector('.big-picture .social__comment');

  clearComments();
  renderComments(photo.comments, commentTemplate);

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

  document.removeEventListener('keydown', onFullscreenEscKeydown);
}

const openFullscreenPhoto = (evt, photo) => {
  evt.preventDefault();
  renderFullscreenPhoto(photo);

  document.addEventListener('keydown', onFullscreenEscKeydown);
};

document.querySelector('.big-picture .big-picture__cancel').addEventListener('click', closeBigPicture);
document.querySelector('.big-picture .comments-loader').addEventListener('click', showComments);

export { openFullscreenPhoto };
