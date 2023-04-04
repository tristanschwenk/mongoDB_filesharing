const Joi = require('@hapi/joi')

module.exports = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
})