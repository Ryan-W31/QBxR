const rateLimit = require("express-rate-limit");

// loginThrottler is used to throttle login attempts.
// The user is limited to 5 login attempts per minute.
// If the user exceeds the limit, a 429 status code is returned.
const loginThrottler = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginThrottler;
