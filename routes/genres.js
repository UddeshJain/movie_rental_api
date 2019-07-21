const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 4,
        maxlength: 255
    }
}))

router.get('/', async (req, res) => {
    const genres = await Genre.find()
    if (genres) {
        res.send(genres)
    } else {
        res.send('Error....').status(400)   
    }
})

router.post('/', async (req, res) => {
    let genre = new Genre({ name: req.body.name })
    let result = await genre.save()
    res.send(result)
})

module.exports = router