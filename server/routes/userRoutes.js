const express = require('express');
const router = express.Router();

const { showUsers, registerUsers, authUsers } = require('../controllers/userControllers');

router.route('/').get(showUsers);

router.post('/login', authUsers);
router.post('/signup', registerUsers);


module.exports = router;