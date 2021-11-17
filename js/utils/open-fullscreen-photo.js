/* eslint-disable id-length */
/* eslint-disable no-use-before-define */

let commentaryArray = [];
const commentCount = 5;
const commentTemplate = document.querySelector('.big-picture .social__comment');

const updateCommentsCount = () => {
  const renderedCommentsCount = document.querySelectorAll('.big-picture .social__comment').length;
  document.querySelector('.big-picture .downloaded-comments-count').innerText = renderedCommentsCount;
};
const showComments = (template) => {
  const renderedComments = document.querySelectorAll('.big-picture .social__comment');

  for (let i = renderedComments.length;
    i < renderedComments.length + commentCount;
    i++) {
    const comment = commentaryArray[i];
    if (comment) {
      renderComment(comment, template);
    } else {
      document.querySelector('.big-picture .comments-loader').classList.add('hidden');
    }
  }
  updateCommentsCount();
};

const renderComments = (comments) => {
  commentaryArray = comments;

  showComments();
};
const renderComment = (commentData) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__picture').alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;
  document.querySelector('.big-picture .social__comments').append(comment);
};

const renderFullscreenPhoto = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__social .likes-count').textContent = photo.likes;
  bigPicture.querySelector('.big-picture__social .comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.big-picture__social .social__caption').textContent = photo.description;
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.big-picture .comments-loader').classList.remove('hidden');

  clearComments();
  renderComments(photo.comments);

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
