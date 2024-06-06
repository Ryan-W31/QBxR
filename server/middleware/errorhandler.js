// Middleware to handle errors
const errorhandler = (err, req, res, next) => {
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);

  res.json({ message: err.message });
};

module.exports = { errorhandler };
