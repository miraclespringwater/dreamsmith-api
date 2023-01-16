const mongoose = require("mongoose");
const AudioCollection = require("./audioCollectionModel");

const audioSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    // user_id: {
    //   type: mongoose.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    collection_id: {
      type: mongoose.ObjectId,
      ref: "AudioCollection",
      // TODO: only require collection_id if not a beat
    },
    title: {
      type: String,
      // TODO: should only be populated if a beat
      required: false,
    },
    fileName: {
      type: String,
      required: true,
      // TODO: validate file extension matches file type ???
      // or just validate that there is an extension ???
    },
    ETag: {
      // TODO: needs to be explored more once uploads
      // are fleshed out
      type: String,
      //required: true,
    },
    format: {
      type: String,
      enum: ["WAV", "FLAC", "MP3"],
    },
    sampleRate: {
      type: Number,
      required: true,
    },
    bitDepth: {
      type: Number,
      required: true,
    },
    // TODO: categories could be object with sub cats ???
    category: {
      type: String,
      required: true,
      enum: ["LOOP", "ONE_SHOT", "BEAT", "FIELD_RECORDING"],
    },
    // TODO: maybe include location for field recordings ??
    instruments: [String],
    bpm: Number,
    key: String,
  },
  { _id: false }
);
audioSchema.virtual("user_id").get(function () {
  return this.duration / 7;
});

const Audio = mongoose.model("Audio", audioSchema, "audio");

module.exports = Audio;
