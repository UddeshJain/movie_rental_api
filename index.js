const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!process.env.JWT_PRIVATE_KEY) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(console.log('Connected Successfully....'))
  .catch((err) => console.log('Error.....', err));

app.use(express.json());
app.get('/', (req, res) => {
  res.send(
    'Hi welcome to Movie Rental Api. Please read the documentation to use this API'
  );
});
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
