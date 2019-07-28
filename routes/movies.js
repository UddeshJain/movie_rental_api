const mongoose = require('mongoose')
const { Movie, validate } = require('../models/movie')
const express = require('express')
const { Genre } = require('../models/genre')
const router = express.Router()

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name')
    if (!movies) return res.status(400).send('Record not found')
    res.send(movies)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre id')
    const movies = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    movies = await movies.save()
    res.send(movies)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre id')
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const movie = Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true })
        return res.send(movie)
    }
    res.status(400).send('Movie with given id is not found.')
})

router.delete('/:id', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        const movie = Movie.findByIdAndDelete(req.params.id)
        return res.send(movie)
    }
    res.status(400).send('Invalid ID')
})