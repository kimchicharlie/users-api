export const errorHandler = (err, _, res, next) => {
  // error passed to next middleware to avoid sending a response a second time
  if (res.headersSent) {
    return next(err)
  }
  if (err.code === 'invalid_token') {
    res.status(403)
  } else {
    // sending status if available in the error, otherwise it's a server error
    res.status(err.status || 500)
  }
  res.json({
    message: err.message,
    error: err,
  })
}
