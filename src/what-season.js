const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (typeof date == "undefined") {
    return 'Unable to determine the time of year!';
  }
  if (Object.prototype.toString.call(date) !== "[object Date]" || Object.getOwnPropertyNames(date).length > 0) {
    throw new Error("Invalid date!")
  }
  if (date instanceof Date) {
    const month = date.getMonth();
    if ([2,3,4].includes(month)) {
      return 'spring';
    }
    if ([5,6,7].includes(month)) {
      return 'summer';
    }
    if ([8,9,10].includes(month)) {
      return 'autumn';
    }
    if ([11,0,1].includes(month)) {
      return 'winter';
    }
  } else {
    return false
  }
}

module.exports = {
  getSeason
};
