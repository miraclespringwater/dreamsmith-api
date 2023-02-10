const AWS = require('aws-sdk');

// Create S3 endpoint
const endpoint = new AWS.Endpoint('s3.wasabisys.com');
// TODO: switch to aws credentials file to fetch the credentials
AWS.config.update({
  accessKeyId: process.env.WASABI_S3_DEV_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_S3_DEV_SECRET_KEY,
  region: 'us-central-1',
  endpoint: endpoint,
});

// Create an S3 client
const s3Client = new AWS.S3({ endpoint: endpoint });
module.exports = s3Client;
