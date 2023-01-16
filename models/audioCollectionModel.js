const mongoose = require("mongoose");

const audioCollectionSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    user_id: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    audio_ids: {
      type: [mongoose.ObjectId],
      ref: "Audio",
    },
    title: {
      type: String,
      required: true,
      // TODO: set min/max
    },
    description: String,
    category: {
      type: String,
      required: true,
      enum: ["BEAT_TAPE", "SAMPLE_PACK", "FIELD_RECORDINGS"],
    },
    slug: String,
  },
  { _id: false }
);

const AudioCollection = mongoose.model(
  "AudioCollection",
  audioCollectionSchema,
  "audio_collections"
);

module.exports = AudioCollection;
