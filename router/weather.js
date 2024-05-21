const express = require('express');
const router = express.Router();

const weatherController = require('../controller/weather.js');

router.get('/today', weatherController.currentDayWeather);

router.get('/hourly', weatherController.hourlyWeather);

module.exports = router;