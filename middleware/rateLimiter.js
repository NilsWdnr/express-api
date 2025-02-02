const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 Min
    max: 100
})

module.exports = rateLimiter;