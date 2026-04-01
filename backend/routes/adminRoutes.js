const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   POST /api/admin/products
// @desc    Add a new product
// @access  Admin (no auth for now)
router.post('/products', async (req, res) => {
  try {
    const { title, category, price, rating, image, description } = req.body;

    // Auto-generate next id
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const nextId = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({
      id: nextId,
      title,
      category,
      price: Number(price),
      rating: Number(rating) || 4.5,
      image,
      description
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update a product
// @access  Admin
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { title, category, price, rating, image, description } = req.body;
    if (title) product.title = title;
    if (category) product.category = category;
    if (price) product.price = Number(price);
    if (rating) product.rating = Number(rating);
    if (image) product.image = image;
    if (description) product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete a product
// @access  Admin
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
