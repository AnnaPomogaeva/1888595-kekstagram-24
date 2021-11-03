function getRandomInRange(min, max) {

  if (min < 0 || max < min || typeof (min) !== 'number' || typeof (max) !== 'number') {
    return;
  }

  if (max === min) {
    return max;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkComentaryLength(commentary, maxLen) {
  return commentary.length <= maxLen;
}

export { getRandomInRange, checkComentaryLength };
