const Sample = require('../models/sampleModel');
const ApiFeatures = require('../utils/apiFeatures');

exports.getSamplesByPack = async (req, res) => {
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
