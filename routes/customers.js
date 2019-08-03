const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const { Customer, validate } = require('../models/customer')
const router = express.Router()

router.get('/', async (req, res) => {
    const customers = await Customer.find()
    if (customers) {
        res.send(customers)
    }
    else {
        res.status(400).send('Record not found')
    }
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    customer = await customer.save()
    res.send(customer)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        if (!req.body.isGold) {
            req.body.isGold = false
        }
        let customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        })
        if (!customer) {
            return res.status(400).send('Customer with given ID is not found')
        }
        return res.send(customer)
    }
    res.status(400).send('Invalid ID')
})

router.delete('/:id', auth, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        let customer = await Customer.findByIdAndDelete(req.params.id)
        if (!customer) {
            return res.status(400).send('Customer with given ID is not found')
        }
        return res.send(customer)
    }
    res.status(400).send('Invalid ID')
})

module.exports = router