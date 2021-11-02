/* eslint-disable id-length */
import { getRandomInRange } from '../utils/utils.js';

function getPhotoURL(photoId) {
  return `photos/${photoId}.jpg`;
}

function getDescription() {
  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  return loremIpsum.substring(0, getRandomInRange(10, loremIpsum.length));
}

function getAvatar() {
  return `img/avatar-${getRandomInRange(1, 6)}.svg`;
}

function getMessage() {
  const stringData = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  return getRandomInRange(1, 2) === 1
    ? stringData[getRandomInRange(0, stringData.length)]
    : `${stringData[getRandomInRange(0, stringData.length)]} ${stringData[getRandomInRange(0, stringData.length)]}`;
}

function getname() {
  const names = ['Аввакум', 'Аваз', 'Агап', 'Агафон', 'Август', 'Августин', 'Аггей', 'Авраам', 'Абрам', 'Аарон', 'Автандил', 'Авдей', 'Авдей', 'Азарий', 'Арам', 'Аркадий', 'Арий', 'Аристарх', 'Арно', 'Арон', 'Арнольд', 'Арсен, Арсений', 'Архип', 'Артур', 'Артем', 'Артемий', 'Акакий', 'Алан', 'Ален', 'Аким', 'Альберт', 'Альфред', 'Александр', 'Алексей', 'Амвросий', 'Анатолий', 'Амадей', 'Амадеус', 'Амаяк', 'Анисим', 'Апполинарий', 'Антон', 'Ануфрий', 'Ануфрий', 'Андрей', 'Аскольд', 'Афанасий', 'Ахмет', 'Адам', 'Адриан', 'Адольф', 'Ашот'];
  return names[getRandomInRange(0, names.length)];
}

function getComments() {
  const commentCount = getRandomInRange(1, 10);

  // eslint-disable-next-line prefer-const
  let comments = [];
  for (let i = 0; i < commentCount; i++) {
    const comment = {
      id: 1 + i,
      avatar: getAvatar(),
      message: getMessage(),
      name: getname(),
    };

    comments.push(comment);
  }

  return comments;
}

function generateTemporaryData() {
  // eslint-disable-next-line prefer-const
  let tempData = [];

  for (let i = 0; i < 25; i++) {
    const tempObject = {
      id: 1 + i,
      url: getPhotoURL(1 + i),
      description: getDescription(),
      likes: getRandomInRange(15, 200),
      comments: getComments(),
    };

    tempData.push(tempObject);
  }

  return tempData;
}

export { generateTemporaryData };
