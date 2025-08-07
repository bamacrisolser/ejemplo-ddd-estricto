const syntaxError = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Invalid JSON syntax',
    });
  }
  next(err);
};

export default syntaxError;
