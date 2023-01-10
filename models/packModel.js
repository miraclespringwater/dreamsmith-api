const mongoose = require("mongoose");

const packSchema = new mongoose.Schema({
  name: "String",
  slug: "String",
  uploader: "String",
  description: "String",
  category: "String", // make enum
  tags: "String", // make enum
  genres: "String", // make enum
});
