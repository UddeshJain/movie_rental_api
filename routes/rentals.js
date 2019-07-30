const mongoose = require('mongoose')
const express = require('express')
const {Rental, validate} = require('../models/rental')

const router = express.Router()

router.get('/', async (req, res) => {
    let rentals = Rental.find().sort({Date: -1})
})