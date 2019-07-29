const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const genreSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 4,
        maxlength: 255
    }
})

const Genre = mongoose.model('Genre', genreSchema)

function validateGenre(genre) {
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(genre, schema)
}

exports.genreSchema = genreSchema
exports.Genre = Genre
exports.validate = validateGenre