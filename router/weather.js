const express = require('express');
const router = express.Router();

const weatherController = require('../../controller/weather.js');

router.get('', weatherController.createWeather);

module.exports = router;