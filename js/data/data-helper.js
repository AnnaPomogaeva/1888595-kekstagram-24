/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

const getPicturesData = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((posts) => onSuccess(posts))
    .catch((error) => onError(error));
};

export { getPicturesData };
