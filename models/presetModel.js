const mongoose = require('mongoose');
const Device = require('./deviceModel');
/* console.log(Object.keys(Device)); */

/*
TODO: Validation
TODO: Rest of schema
TODO: Tags & instruments: (enum in schema vs collection)
TODO: Format for key
TODO: Format for length
TODO: Media (previews, any waveform data, etc.)
TODO: Handle file info (preset rate, bit depth, etc.) but this might
      be better handled when working with the files themselves...
      Or might not even be relevant
*/

const presetSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    packId: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Pack',
    },
    fileName: {
      type: String,
      required: [true, 'A preset must have a file name.'],
      maxlength: [
        96,
        'A preset must have a file name less or equal to 96 characters.',
      ],
      minlength: [
        4,
        'A preset file name must be at least 4 characters.',
      ],
    },
    device: Device.schema,
    category: {
      type: String,
      required: true,
      enum: ['template', 'device', 'preset', 'rack'],
    },
    tags: {
      type: Array,
      required: true,
      minlength: 1,
      maxlength: 5,
    },
  },
  { _id: false }
);

const preset = mongoose.model(
  'preset',
  presetSchema,
  'presets'
);

module.exports = preset;
