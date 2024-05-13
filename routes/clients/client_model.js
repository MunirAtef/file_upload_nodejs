
const Mongoose = require('mongoose')

const ClientSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
      type: String,
      required: true
    },
    type: {
        type: String,
        enum: ["supplier", "client"],
        required: [true, "client-type-not-provided"]
    },
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    address: {
        note: String,
        governorate: String,
        city: String
    },
    categories: [{
        type: String,
    }]
})

const ClientModel = Mongoose.model('client', ClientSchema, 'clients');

module.exports = ClientModel;

