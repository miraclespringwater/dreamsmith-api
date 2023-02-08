const accepts = require('accepts');

module.exports = (allowedTypes) => (req, res, next) => {
  const requestedTypes = accepts(req).types();
  console.log(requestedTypes);
  return [].concat(allowedTypes).some((t) => requestedTypes.includes(t))
    ? next()
    : next('route');
};
