// Функции взяты из интернета и доработаны
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return NaN;
  }
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b)); // округление в меньшую
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result); // округление в нижнюю сторону
}

function getRandomPositiveFloat(a, b, digits = 1) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return NaN;
  }
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

export {getRandomArrayElement, getRandomPositiveInteger, getRandomPositiveFloat};


