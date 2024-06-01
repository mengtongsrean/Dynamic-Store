// controllers/productController.js
const { getProductCollection } = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await getProductCollection().find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getProductById = async (req, res) => {
//   try {
//     const product = await getProductCollection().findOne({ _id: req.params.id });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const result = await getProductCollection().insertOne(req.body);
//     res.status(201).json(result.ops[0]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const result = await getProductCollection().updateOne(
//       { _id: req.params.id },
//       { $set: req.body }
//     );
//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const result = await getProductCollection().deleteOne({ _id: req.params.id });
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = { getAllProducts};
