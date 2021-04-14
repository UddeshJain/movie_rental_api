const mongoose = require('mongoose');
const { Movie, validate } = require('../models/movie');
const auth = require('../middleware/auth');
const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  if (!movies) return res.status(400).send('Record not found');
  res.send(movies);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre id');
  let movies = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movies = await movies.save();
  res.send(movies);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre id');
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      { new: true }
    );
    return res.send(movie);
  }
  res.status(400).send('Movie with given id is not found.');
});

router.delete('/:id', auth, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    return res.send(movie);
  }
  res.status(400).send('Invalid ID');
});

module.exports = router;
