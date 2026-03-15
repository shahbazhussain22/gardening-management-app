const express = require('express');
const router = express.Router();
const { getWeatherForecast} = require('../controllers/weatherController');

router.get('/', getWeatherForecast);
router.get('/notification', getWeatherForecast);

module.exports = router;
