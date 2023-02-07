const mongoose = require('mongoose');
const slugify = require('slugify');
/*
TODO: Validation
TODO: Rest of schema
TODO: Handle media (demo tracks, any wave form data, cover art, etc.)
*/

const schemaObj = {
  // _id: mongoose.ObjectId,
  title: {
    type: String,
    required: [true, 'A pack must have a title.'],
    unique: true,
    trim: true,
    maxlength: [
      48,
      'A pack title must be less or equal to 48 characters.',
    ],
    minlength: [
      4,
      'A pack title must be at least 4 characters.',
    ],
  },
  description: {
    type: String,
    required: true,
    maxlength: [
      256,
      'A pack must have a description of less or equal to 256 characters.',
    ],
    minlength: [
      12,
      'A pack must have a description of at least 12 characters.',
    ],
  },
  genre: {
    type: String,
    required: true,
    enum: [
      'ambient',
      'idm',
      'drum & bass',
      'hip-hop',
      'pop',
      'phonk',
    ],
  },
  slug: {
    type: String,
    required: false,
    maxlength: [
      48,
      'A pack must have a slug of less or equal to 48 characters.',
    ],
    minlength: [
      4,
      'A pack must have a slug of at least 4 characters.',
    ],
  },
};
const schemaOptions = {
  toJSON: {
    transform: (doc, obj) => {
      delete obj.__v;
      return obj;
    },
  },
};
if (process.argv[2] === '--import') {
  schemaObj._id = mongoose.ObjectId;
  schemaOptions._id = false;
}

const packSchema = new mongoose.Schema(
  schemaObj,
  schemaOptions
);
// schemaObj,
// schemaOptions

/* Slugify the title before saving */
packSchema.pre('save', function () {
  this.slug = slugify(this.title, { lower: true });
});

const Pack = mongoose.model('Pack', packSchema, 'packs');

module.exports = Pack;
