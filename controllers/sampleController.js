const Sample = require('../models/sampleModel');
const ApiFeatures = require('../utils/apiFeatures');

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
exports.getPackSampleFiles = (req, res) => {
  res.json({ message: 'hello from sample files by pack' });
};

exports.uploadPackSamples = (req, res) => {
  res.json({ message: 'hello form upload sample files by pack' });
};
