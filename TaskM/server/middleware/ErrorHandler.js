const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
  };
  
  const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  
  module.exports = { handleErrors, asyncHandler };
  