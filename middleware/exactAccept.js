const accepts = require('accepts');

module.exports = (allowedTypes) => (req, res, next) => {
  const requestedTypes = accepts(req).types();
  return [].concat(allowedTypes).some((t) => requestedTypes.includes(t))
    ? next()
    : next('route');
};
