const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const auth = require('../middleware/auth');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  let rentals = await Rental.find().sort('-dateOut');
  if (!rentals) return res.status(400).send('Record not found');
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (
    !mongoose.Types.ObjectId.isValid(req.body.customerId) ||
    !mongoose.Types.ObjectId.isValid(req.body.movieId)
  ) {
    return res.status(400).send('Customer ID or Movie ID is not invailid');
  }
  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(400).send('Customer with given ID is not found');
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Movie with given ID is not found');
  if (movie.numberInStock === 0) res.status(400).send('Movie is not in stock');
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update(
        'movies',
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    res.send(rental);
  } catch (error) {
    res.send(500).send('Something went wrong');
  }
});

module.exports = router;
