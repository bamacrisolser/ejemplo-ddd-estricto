import logger from '../../config/logger.js';

const errorHandler = (err, req, res) => {
  logger.error(
    JSON.stringify({
      method: req.method,
      originalUrl: req.originalUrl,
      ip: req.ip,
      body: req.body,
      headers: req.headers,
    })
  );
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error ',
  });
  return;
};

export default errorHandler;
