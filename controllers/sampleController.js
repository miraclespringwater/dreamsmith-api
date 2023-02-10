const Sample = require('../models/sampleModel');
const ApiFeatures = require('../utils/apiFeatures');

const s3 = require('../utils/s3Client');

exports.getPackSamples = async (req, res) => {
  try {
    const sampleFeatures = new ApiFeatures(
      Sample.find({ packId: req.params.packId }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const samples = await sampleFeatures.mongooseQuery;

    res.status(200).json({
      status: 'success',
      results: samples.length,
      data: { samples },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail' });
  }
};
exports.getPackSampleFiles = async (req, res) => {
  await s3
    .getObject({ Bucket: 'dreamsmith-dev2/zips', Key: '1675955320465' })
    .createReadStream()
    .pipe(res);
  /* res.json({ message: 'hello from sample files by pack' }); */
};

exports.sampleUploadHandler = (req, res) => {
  console.log(req.file);
  res.json({ message: 'hello form upload sample files by pack' });
};
