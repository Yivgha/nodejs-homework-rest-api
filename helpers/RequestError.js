const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not found",
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = RequestError;