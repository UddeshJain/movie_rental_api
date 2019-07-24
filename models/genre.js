const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 4,
        maxlength: 255
    }
}))

function validateGenre(genre) {
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(genre, schema)
}

exports.Genre = Genre
exports.validate = validateGenre