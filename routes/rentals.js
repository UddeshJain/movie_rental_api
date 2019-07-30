const mongoose = require('mongoose')
const express = require('express')
const {Rental, validate} = require('../models/rental')

const router = express.Router()

router.get('/', async (req, res) => {
    let rentals = await Rental.find().sort({ dateOut: -1 })
    if(!rentals) return res.status(400).send('Record not found')
    res.send(rentals)
})

module.exports = router