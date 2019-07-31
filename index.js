const express = require('express')
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const app = express()

mongoose.connect('mongodb+srv://UddeshRW:uddesh@cluster0-2erky.mongodb.net/Uddesh', { useNewUrlParser: true })
    .then(console.log('Connected Successfully....'))
    .catch(err => console.log('Error.....', err))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listining on port: ${port}`))