const mongoose = require('mongoose');
const createError = require('http-errors');
const Product = require('../models/product.model');

module.exports = {

    createProduct: async (request, reponse, next) => {
        try {
            const product = new Product(request.body);
            const result = await product.save();
            reponse.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },

    getAllProducts: async (request, response, next) => {
        try {
            const results = await Product.find({}, {__v: 0})
            response.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    findProductById: async (request, reponse, next) => {
        const id = request.params.id;
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw createError(404, "Product does not exist");
            }
            reponse.send(product);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Product id'));
                return;
            }
            next(error);
        }
    },

    deleteProductById: async (request, reponse, next) => {
        const id = request.params.id;
        try {
            const result = await Product.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, 'Product does not exist.');
            }
            reponse.send(result);
        } catch (error) {
            console.log(error.message);
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid productId"));
                return;
            }
            next(error);
        }
    },

    updateProductById: async (request, reponse, next) => {
        const id = request.params.id;
        const updateProduct = request.body;
        const options = {new: true};
        try {
            const result = await Product.findByIdAndUpdate(id, updateProduct, options);
            if (!result) {
                throw createError(404, "Product does not exist");
            }
            reponse.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid productId"));
                return;
            }
            next(error);
        }
    }


}