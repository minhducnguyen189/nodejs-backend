const mongoose = require('mongoose');
const dotsenv = require('dotenv').config();

module.exports = () => {
    // connecting to the mongodb
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Mongodb connected....');
        })
        .catch(err => console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log("Mongoos connected...");
    });

    // mongoose.connection.on('error', (err) => {
    //     console.log(err.message);
    // });

    // mongoose.connection.on('disconnected', () => {
    //     console.log('Mongoose connection is disconnected');
    // });

    // process.on('SIGINT', () => {
    //     mongoose.connection.close(() => {
    //         console.log('Mongoose connection is disconnected due to the app termination...');
    //     })
    //     process.exit(0);
    // });
}