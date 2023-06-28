// import required modules
// express is used for creating server
const express = require('express');
const createError = require('http-errors');
const dotsenv = require('dotenv').config();

// creating an express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Initialize DB
require('./initDB')();

// setting up product route which will include the module product.js as a middle and use it.
const productRoute = require('./routes/product.route');
app.use('/v1/products', productRoute);

// handling Not Found (404) Error:
app.use((request, response, next) => {
    next(createError(404, "Not found"));
});

// error handling for middle ware
app.use((err, request, response, next) => {
    response.status(err.status || 500);
    response.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3000;

// starting the server
app.listen(PORT, () => {
    console.log("Server started on port " + PORT + "...");
});
