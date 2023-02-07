const Preset = require('../models/presetModels');
const ApiFeatures = require('../utils/apiFeatures');

exports.getPresetsByPack = async (req, res) => {
  const presetFeatures = new ApiFeatures(
    Preset.find({ packId: req.params.id }),
    req.query
  )
    .filter()
    .limitFields()
    .paginate();
  const presets = await presetFeatures.mongooseQuery;
  res.status(200).json({
    status: 'success',
    results: presets.length,
    data: { presets },
  });
};
