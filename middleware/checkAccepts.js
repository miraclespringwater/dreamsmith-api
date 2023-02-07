exports.json = (req, res, next) => {
  req.accepts('application/json') ? next() : next('route');
};

exports.zip = (req, res, next) => {
  req.accepts('application/zip') ? next() : next('route');
};
