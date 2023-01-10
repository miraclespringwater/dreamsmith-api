const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const router = express.Router();

/* S3 configuration */
// Create S3 endpoint
const endpoint = new AWS.Endpoint("s3.wasabisys.com");
// TODO: switch to aws credentials file to fetch the credentials
AWS.config.update({
  secretAccessKey: process.env.WASABI_S3_DEV_KEY,
  accessKeyId: process.env.WASABI_S3_DEV_KEY_ID,
  region: "us-central-1",
  endpoint: endpoint,
});

// Create an S3 client
const s3 = new AWS.S3({ endpoint: endpoint });

// Setup multer to use S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "dreamsmith-dev",
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

/* LOCAL UPLOADS */
// const upload = multer({ dest: "./dev/data/uploads" });
// const localUploadHandler = (req, res) => {
//   console.log(req.file);
//   res.status(200).json({ message: "success" });
// };
// router.route("/local").post(upload.single("text-file"), localUploadHandler);

/* S3 UPLOADS */
const s3UploadHandler = (req, res) => {
  console.log(req.file);
  res.status(200).json({ message: "success" });
};
// router.route("/s3").post(upload.single("text-file"), s3UploadHandler);
router.route("/s3").post(upload.single("text-file"), s3UploadHandler);

module.exports = router;
