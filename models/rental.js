const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const Rental = mongoose.model('Rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: Number,
                required: true,
                min: 5,
                max: 15
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 250
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}))

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }
    return Joi.validate(rental, schema)
}

exports.Rental = Rental
exports.validate = validateRental