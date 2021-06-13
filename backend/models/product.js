const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
