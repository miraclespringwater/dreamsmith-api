const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../utils/s3Client');

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    acl: 'public-read',
    bucket: 'dreamsmith-dev2/zips',
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
