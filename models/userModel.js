const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    username: {
      // TODO: validation
      type: String,
      required: true,
      minlength: 8,
      maxlength: 24,
      trim: true,
    },
    email: String,
    displayName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 32,
      trim: true,
    },
    firstName: String,
    lastName: String,
    isArtist: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
