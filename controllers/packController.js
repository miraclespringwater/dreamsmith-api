const Pack = require('../models/packModel');
const Samples = require('../models/sampleModel');
const Preset = require('../models/presetModel');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAllPacks = async (req, res) => {
  try {
    const features = new ApiFeatures(Pack.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const packs = await features.mongooseQuery;

    // send response
    res.status(200).json({
      status: 'success',
      results: packs.length,
      data: { packs },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail' });
  }
};

exports.getPackContents = async (req, res) => {
  try {
    let samples, presets;
    if (req.params.type == 'samples' || !req.params.type) {
      const sampleFeatures = new ApiFeatures(
        Samples.find({ packId: req.params.id }),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      samples = await sampleFeatures.mongooseQuery;
    }
    if (req.params.type == 'presets' || !req.params.type) {
      const presetFeatures = new ApiFeatures(
        Preset.find(),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      presets = await presetFeatures.mongooseQuery;
    }

    // send response
    const data = {};
    if (samples) data.samples = samples;
    if (presets) data.presets = presets;
    res.status(200).json({
      status: 'success',
      results:
        ((data.samples && data.samples.length) || 0) +
        ((data.presets && data.presets.length) || 0),
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail' });
  }
};

exports.createPack = async (req, res) => {
  const pack = await Pack.create(req.body);
  console.log(pack);
  res.status(200).json({ status: 'success', data: pack });
};

exports.updatePack = async (req, res) => {
  const pack = await Pack.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: 'success', data: pack });
};

exports.deletePack = async (req, res) => {
  await Pack.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'success', data: null });
};
