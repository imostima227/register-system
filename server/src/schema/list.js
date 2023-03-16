const Joi = require('joi')

exports.UserInfoSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(2).max(20).required(),
    major: Joi.string().required(),
    grade: Joi.any().allow('2019级','2020级','2021级','2022级').required(),
    sex:Joi.any().allow('男','女').required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required()
}).unknown()