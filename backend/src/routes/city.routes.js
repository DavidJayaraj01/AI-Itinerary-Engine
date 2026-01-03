const express = require('express');
const cityController = require('../controllers/city.controller');

const router = express.Router();

// Search cities
router.get('/search', cityController.searchCities);

module.exports = router;
