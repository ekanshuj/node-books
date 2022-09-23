const express = require('express');
const router = express.Router();

const { showUsers, registerUsers, authUsers } = require('../controllers/userControllers');
const { validateToken } = require('../middleware/authJWT');

router.get('/:id', validateToken, showUsers)
router.post('/login', authUsers);
router.post('/signup', registerUsers);


module.exports = router;