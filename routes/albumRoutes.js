const express = require('express');

const albumController = require('../controllers/albumController');
const { spotifyAccessToken } = require('../middlewares/spotifyAccessToken');


const router = express.Router();

router.get('/find', spotifyAccessToken, albumController.find);

module.exports = router;
