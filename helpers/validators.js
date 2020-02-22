const isString = str => Object.prototype.toString.call(str) === "[object String]";
const isFloat = num => !!parseFloat(num);

module.exports = { isString, isFloat };
