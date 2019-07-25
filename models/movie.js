const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const { genreSchema } = require('./genre')

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 250
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    }
}))

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string.required(),
        numberInStock: Joi.number().min(0).max(250).required(),
        dailyRentalRate: Joi.number().min(0).max(1000).required()
    }
    return Joi.validate(movie, schema)
}

exports.Movie = Movie
exports.validate = validateMovie