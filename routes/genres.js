const express = require('express')
const mongoose = require('mongoose')
const { Genre, validate} = require('../models/genre')
const router = express.Router()

router.get('/', async (req, res) => {
    const genres = await Genre.find()
    if (genres) {
        return res.send(genres)
    }
    res.status(400) .send('Record not found.')  
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    let genre = new Genre({ name: req.body.name })
    genre = await genre.save()
    res.send(genre)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        return res.send(genre)
    }
    res.status(400).send('The genre with the give ID is not found')
})

router.delete('/:id', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const genre = await Genre.findByIdAndDelete(req.params.id)
        return res.send(genre)
    }
    res.status(400).send('The genre with the give ID is not found')
})

module.exports = router