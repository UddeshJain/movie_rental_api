const express = require('express')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const {User} = require('./users')
const router = express.Router()

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ emal: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invailid email or password')
    res.send(true)
})

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(250).required(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(req, schema)
}

module.exports = router