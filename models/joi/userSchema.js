const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(40).required(),
    mobile:Joi.number().integer().min(10),
    email:Joi.string().email({ minDomainSegments: 2})
})