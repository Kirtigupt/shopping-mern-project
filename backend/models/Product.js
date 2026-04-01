const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number, // Keeping the original id for ease of transition
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
