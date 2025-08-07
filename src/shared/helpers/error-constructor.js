const error = (message, additionalData, statusCode) => {
  let newError = new Error(message);
  newError.statusCode = 400;
  if (additionalData) newError.additionalData = additionalData;
  if (statusCode) newError.statusCode = statusCode;
  return newError;
};

export default error;
