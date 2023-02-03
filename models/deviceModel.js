const mongoose = require('mongoose');

/*
TODO: Validation
TODO: Rest of schema
TODO: Tags & instruments: (enum in schema vs collection)
TODO: Format for key
TODO: Format for length
TODO: Media (previews, any waveform data, etc.)
TODO: Handle file info (device rate, bit depth, etc.) but this might
      be better handled when working with the files themselves...
      Or might not even be relevant
*/

const deviceSchema = new mongoose.Schema(
  {
    type: {
      required: [true, 'A device must have a type.'],
      type: String,
      enum: ['vst', 'synthesizer', 'sampler', 'daw'],
    },
    name: {
      type: String,
      required: [true, 'A device must have a name.'],
      minlength: [
        2,
        'Device name must be at least 2 characters.',
      ],
      maxlength: [
        32,
        'Device name must be less or equal to 32 characters.',
      ],
    },
    version: {
      type: Number,
      required: [true, 'A device must have a version.'],
      min: 0.1,
      max: 128,
    },
  },
  { _id: false }
);

const device = mongoose.model(
  'device',
  deviceSchema,
  'devices'
);

module.exports = device;
