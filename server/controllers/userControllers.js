const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const { createToken } = require('../middleware/authJWT');


class userController {
  static showUsers = asyncHandler(async (req, res) => {
    const { id } = req.params.id;
    try {
      const user = await User.find({ _id: { $ne: id } }).select(["name", "email"]);
      (user) ? res.status(201).json({ user, status: true }) : res.status(401).json({ message: "No such User found" })
    } catch (er) {
      return res.status(501).json({ message: "Something Went Wrong", error: er });
    }
  })

  static registerUsers = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      if (!name, !email, !password) return res.status(401).json({ message: 'Please enter all fields' });
      const isUser = await User.findOne({ email })
      if (isUser) res.status(401).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: pass
      });
      (user) ? res.status(201).json({ user, message: "User created successfully", status: false }) : res.status(401).json({ message: "Something went wrong" });
    } catch (er) {
      return res.status(501).json({ message: "Something Went Wrong", error: er });
    }

  })

  static authUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(401).json({ message: 'User does not exist' });

      const pass = await bcrypt.compare(password, user.password);

      if (user && pass) {
        const token = createToken(user._id)
        return res.cookie("authToken", token, {
          httpOnly: true
        }).status(201).json({ name: user.name, email: user.email, token, status: true })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    } catch (er) {
      return res.status(501).json({ message: "Something Went Wrong", error: er });

    }
  });

}

module.exports = userController;






















