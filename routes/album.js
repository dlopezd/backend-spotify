const express = require('express');
const albumController = require('../controllers/albumController');

const router = express.Router();


router.get('/find', albumController.find);


module.exports = router;
