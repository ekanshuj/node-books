const express = require('express');
const router = express.Router();

const { showBooks, createBooks, updateBooks, deleteBooks } = require('../controllers/bookControllers');

router.route('/').get(showBooks);
router.post('/addBooks', createBooks);
router.put('/addBooks', updateBooks);     // redrirect through :id to updateBooks
router.delete('/addBooks', deleteBooks);     // redrirect through :id to deleteBooks


module.exports = router;