const Joi = require('joi')

exports.userLoginSchema = Joi.object({
    username: Joi.string().alphanum().min(6).max(12).required(),
    password: Joi.string().min(6).max(16).required()
})