const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!')
  }
  if (arr.length == 0) return arr;

  const resultArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    if (typeof resultArr[i] == 'string' && typeof resultArr[i+2] == 'string' && resultArr[i].includes('--discard-next') && resultArr[i+2].includes('prev')) {
      resultArr.splice(i+2, 1);
    }
    if (resultArr[i] === '--discard-next') {
      if (i == resultArr.length-1) {
        resultArr.splice(i, 1);
      } else {
        resultArr.splice(i, 2);
      }
    }
    if (resultArr[i] === '--discard-prev') {
      if (i == 0) {
        resultArr.splice(0, 1);
      } else {
        resultArr.splice(i-1, 2);
      }
    }
    if (resultArr[i] === '--double-next') {
      if (i == resultArr.length-1) {
        resultArr.splice(i, 1);
      } else {
        resultArr.splice(i, 1, resultArr[i+1]);
      }
    }
    if (resultArr[i] === '--double-prev') {
      if (i == 0) {
        resultArr.splice(i, 1);
      } else {
        resultArr.splice(i, 1, resultArr[i-1]);
      }
    }
  }
  return resultArr;
}

module.exports = {
  transform
};
