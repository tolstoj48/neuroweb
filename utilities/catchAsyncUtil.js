// Function to catch in async functions
const wrapAsync = function wrapAsync(fn) {
  return function (req, res, next) {
      fn(req, res, next).catch(e => next(e))
  }
};

module.exports = wrapAsync;