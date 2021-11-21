const COMMENT_COUNT = 5;

let commentaryArray = [];
const commentTemplate = document.querySelector('.big-picture .social__comment');
const socialCommentsElement = document.querySelector('.big-picture .social__comments');
const commentsLoaderButtonElement = document.querySelector('.big-picture .comments-loader');
const bigPictureElement = document.querySelector('.big-picture');

const updateCommentsCount = (count) => {
  document.querySelector('.big-picture .downloaded-comments-count').innerText = count;
};
const renderComment = (commentData) => {
  const comment = commentTemplate.cloneNode(true);
  const socialPictureElement = comment.querySelector('.social__picture');
  socialPictureElement.src = commentData.avatar;
  socialPictureElement.alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;
  socialCommentsElement.append(comment);
};
const showComments = (template) => {
  const renderedComments = document.querySelectorAll('.big-picture .social__comment').length;

  for (let index = renderedComments;
    index < renderedComments + COMMENT_COUNT;
    index++) {
    const comment = commentaryArray[index];
    if (comment) {
      renderComment(comment, template);
      updateCommentsCount(1 + index);
    } else {
      commentsLoaderButtonElement.classList.add('hidden');
    }
  }
};

const clearComments = () => {
  socialCommentsElement.innerHTML = '';
};
const renderComments = (comments) => {
  commentaryArray = comments;

  showComments();
};
const renderFullscreenPhoto = (photo) => {
  const bigPicture = bigPictureElement;
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__social .likes-count').textContent = photo.likes;
  bigPicture.querySelector('.big-picture__social .comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.big-picture__social .social__caption').textContent = photo.description;
  document.querySelector('body').classList.add('modal-open');
  commentsLoaderButtonElement.classList.remove('hidden');

  clearComments();
  renderComments(photo.comments);

  bigPicture.classList.remove('hidden');
};
function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

const pictureThumbnailClickHandler = (evt, photo) => {
  evt.preventDefault();
  renderFullscreenPhoto(photo);

  document.addEventListener('keydown', function handler() {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
      this.removeEventListener(handler);
    }
  });
};

document.querySelector('.big-picture .big-picture__cancel').addEventListener('click', closeBigPicture);
commentsLoaderButtonElement.addEventListener('click', showComments);

export { pictureThumbnailClickHandler };
