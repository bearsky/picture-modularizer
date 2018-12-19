const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  filename: String,
  sliceOrientation: String,
  parts: [String],
});

module.exports = mongoose.model('Image', imageSchema);