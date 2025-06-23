module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.expose ? err.message : "An internal error occurred.",
  });
};
