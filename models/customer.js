const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        required: true,
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 11
    }
}))

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(11).required(),
    }
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer