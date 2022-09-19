const { sign, verify } = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const SECRET_KEY = process.env.JWT_SECRET;

const createToken = (id) => {
  return sign({ id }, SECRET_KEY);
};

const validateToken = asyncHandler(async (req, res, next) => {
  const Token = req.cookies["authToken"];
  if (!Token) return res.status(401).json({ message: "Unauthorized - No Token" });
  try {
    const data = verify(Token, SECRET_KEY)
    if (data) {
      req.user = await User.findById(data.id);
      return next();
    }
  } catch (er) {
    return res.status(501).json({ message: "Something Went Wrong", error: er })
  }
})

module.exports = { createToken, validateToken };