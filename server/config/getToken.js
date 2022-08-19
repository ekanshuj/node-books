const jwt = require('jsonwebtoken');

const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);

};

module.exports = getToken;