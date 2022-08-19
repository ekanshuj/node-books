const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const getToken = require('../config/getToken');


class userController {
  static showUsers = (req, res) => {

  };

  static registerUsers = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name, !email, !password) res.status(401).json({ message: 'Please enter all fields' });

    const isUser = await User.findOne({ email })
    if (isUser) res.status(401).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: pass
    });

    if (user) res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: getToken(user._id)

    });
    else {
      res.status(401).json({ message: 'Internal Server Error' });
    };

  })

  static authUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) res.status(401).json({ message: 'User does not exist' });

    const pass = await bcrypt.compare(password, user.password);

    if (email && pass) res.status(201).json({
      name: user.name,
      email: user.email,
    });
    else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }

  })
}

module.exports = userController;



// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
// router.post('/getuser', fetchuser,  async (req, res) => {

//   try {
//     userId = req.user.id;
//     const user = await User.findById(userId).select("-password")
//     res.send(user)
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// })



// var jwt = require('jsonwebtoken');
// const JWT_SECRET = 'Harryisagoodb$oy';

// const fetchuser = (req, res, next) => {
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }


// module.exports = fetchuser;






















