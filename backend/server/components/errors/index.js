/**
 * Error responses
 */

// "use strict";;

module.exports[404] = (req, res) => {
  var viewFilePath = "404";
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, err => {
    if (err) {
      return res.json(result, result.status);
    }

    res.render(viewFilePath);
  });
};


exports.validationError = (res, err) => {
  const response = {
    status: 422,
    message: err.messsage
  };

  return res.status(422).json(response);
};

exports.handleError = (res, err) => {
  const response = {
    status: 500,
    message: err.message
  };

  return res.status(500).send(response);
};

exports.handle404 = (res, error) => {
  const response = {
    status: 404,
    message: "Sorry! Not found."
  };

  return res.status(404).send(response);
};
