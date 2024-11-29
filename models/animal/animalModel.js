const mongoose = require('mongoose');

const Schema = mongoose.Schema

const animalSchema = new Schema({
    name: {
        type: String,
        required: [true, 'You can not keep the title empty']
    },
    image: {
        type: String,

    },
    category: {
        type: String,

    },
}, { timestamps: true })

module.exports = mongoose.model('Animal', animalSchema)