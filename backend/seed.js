require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopping';

mongoose.connect(URI)
.then(async () => {
  console.log('Connected to MongoDB for seeding...');
  await importData();
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

const importData = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products.');

    // Read the frontend data file
    const frontendDataPath = path.join(__dirname, '../src/data/products.js');
    let dataStr = fs.readFileSync(frontendDataPath, 'utf8');
    
    // Remove the ES module export and extract just the array
    // The file starts with: export const products = [ ... ];
    dataStr = dataStr.replace('export const products =', '');
    // Remove trailing semicolon if present
    dataStr = dataStr.trim();
    if (dataStr.endsWith(';')) {
      dataStr = dataStr.slice(0, -1);
    }
    
    // Parse the array using Function constructor (safer than eval)
    const products = new Function('return ' + dataStr)();
    
    console.log(`Found ${products.length} products to seed.`);
    
    await Product.insertMany(products);
    console.log('Data Imported into MongoDB successfully!');
    
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};
