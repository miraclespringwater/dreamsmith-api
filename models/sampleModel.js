const mongoose = require("mongoose");

/*
TODO: Validation
TODO: Rest of schema
TODO: Tags & instruments: (enum in schema vs collection)
TODO: Format for key
TODO: Format for length
TODO: Media (previews, any waveform data, etc.)
TODO: Handle file info (sample rate, bit depth, etc.) but this might
      be better handled when working with the files themselves...
      Or might not even be relevant
*/

const sampleSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    packId: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Pack",
    },
    fileName: {
      type: String,
      required: [true, "A sample must have a file name."],
      maxlength: [
        96,
        "A sample must have a file name less or equal to 96 characters.",
      ],
      minlength: [4, "A sample file name must be at least 4 characters."],
    },
    category: {
      type: String,
      required: true,
      enum: ["oneshot", "loop", "field recording"],
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

const Sample = mongoose.model("Sample", sampleSchema, "samples");

module.exports = Sample;
