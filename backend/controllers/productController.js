const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    // Also try finding by the original integer id just in case they pass that instead of MongoDB _id
    const product = await Product.findById(req.params.id).catch(() => null) 
      || await Product.findOne({ id: req.params.id }).catch(() => null);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    // Case-insensitive regex match for category
    const categoryQuery = new RegExp('^' + req.params.category + '$', 'i');
    const products = await Product.find({ category: categoryQuery });
    res.json(products);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
};
