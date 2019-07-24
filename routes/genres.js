const express = require('express')
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const router = express.Router()

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

router.get('/', async (req, res) => {
    const genres = await Genre.find()
    if (genres) {
        res.send(genres)
    } else {
        res.status(400) .send('Record not found.')  
    }
})

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    let genre = new Genre({ name: req.body.name })
    genre = await genre.save()
    res.send(genre)
})

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body)
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