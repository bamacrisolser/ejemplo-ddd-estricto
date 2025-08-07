import dotenv from 'dotenv';
import logger from '../../config/logger.js';
dotenv.config();

const successHandler = (req, res, { message, additionalData, statusCode }) => {
  if (!statusCode) statusCode = 200;
  let response = {
    message,
    ...additionalData,
  };
  logger.info(
    JSON.stringify({
      method: req.method,
      originalUrl: req.originalUrl,
      ip: req.ip,
      body: req.body,
      headers: req.headers,
    })
  );
  res.status(statusCode).json(response);
  return;
};

export const methods = {
  successHandler,
};
