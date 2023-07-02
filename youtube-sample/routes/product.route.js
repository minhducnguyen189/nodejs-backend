const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller")

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);
router.get('/:id', ProductController.findProductById);
router.delete('/:id', ProductController.deleteProductById);
router.patch('/:id', ProductController.updateProductById);

module.exports = router;
