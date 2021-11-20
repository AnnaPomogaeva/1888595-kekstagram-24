const COMMENT_COUNT = 5;

let commentaryArray = [];
const commentTemplate = document.querySelector('.big-picture .social__comment');
const socialCommentsElement = document.querySelector('.big-picture .social__comments');
const commentsLoaderButtonElement = document.querySelector('.big-picture .comments-loader');
const bigPictureElement = document.querySelector('.big-picture');

const updateCommentsCount = (count) => {
  document.querySelector('.big-picture .downloaded-comments-count').innerText = count;
};
const showComments = (template) => {
  const renderedComments = document.querySelectorAll('.big-picture .social__comment').length;

  for (let i = renderedComments;
    i < renderedComments + COMMENT_COUNT;
    i++) {
    const comment = commentaryArray[i];
    if (comment) {
      renderComment(comment, template);
      updateCommentsCount(1 + i);
    } else {
      commentsLoaderButtonElement.classList.add('hidden');
    }
  }
};

const renderComments = (comments) => {
  commentaryArray = comments;

  showComments();
};
const renderComment = (commentData) => {
  const comment = commentTemplate.cloneNode(true);
  let socialPictureElement = comment.querySelector('.social__picture');
  socialPictureElement.src = commentData.avatar;
  socialPictureElement.alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;
  socialCommentsElement.append(comment);
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

const onFullscreenEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const clearComments = () => {
  socialCommentsElement.innerHTML = '';
};


function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onFullscreenEscKeydown);
}

const pictureThumbnailClickHandler = (evt, photo) => {
  evt.preventDefault();
  renderFullscreenPhoto(photo);

  document.addEventListener('keydown', onFullscreenEscKeydown);
};

document.querySelector('.big-picture .big-picture__cancel').addEventListener('click', closeBigPicture);
commentsLoaderButtonElement.addEventListener('click', showComments);

export { pictureThumbnailClickHandler };
