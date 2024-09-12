const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const upload = require('../multerConfig');

router.route('/')
  .get(getAllProducts)
  .post(upload.single('thumbnail'), createProduct);

router.route('/:id')
  .get(getProduct)
  .patch(upload.single('thumbnail'), updateProduct)
  .delete(deleteProduct);

module.exports = router;
