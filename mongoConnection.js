
// import mongoose from "mongoose";
const Mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

let connectDB = () => {
    Mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

    Mongoose.connection
        .once('open', () => {
            console.log('Connection to the DB established');
        })
        .on('error', (err) => {
            console.log('Error occurred while connecting to the DB', err);
        })
}

module.exports = connectDB;
