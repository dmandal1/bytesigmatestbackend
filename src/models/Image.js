const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  fileName: String,
  filter: String,
  imageUrl: String,
  uploadedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', imageSchema);
