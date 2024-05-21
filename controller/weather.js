const { getLatAndLon, getCurrentDayWeather } = require('../utils/API_Calls');
const { cityName, stateCode, limit, countryCode } = require('../utils/API_URL');
const apiKey = require('../config/credentials');
const moment = require('moment')

exports.currentDayWeather = async (req, res, next) => {
  try {
    let result = await getLatAndLon(cityName,stateCode,countryCode,limit,apiKey);
    const state = result.state;
    const city = result.name;

    let currentDay = await getCurrentDayWeather(result?.lat,result?.lon,apiKey);
    
    const formattedDate = moment.unix(currentDay?.dt).format('D MMMM YYYY');
    console.log(formattedDate);

    const weather = currentDay?.weather[0]?.main;
    const desc = currentDay?.weather[0]?.description;
    const temp_Celsius = Math.floor(currentDay?.main?.temp - 273.15);
    const feelsLike_Celsius = Math.floor(currentDay?.main?.feels_like - 273.15);
    const sunset = moment.unix(currentDay?.sys?.sunset).utcOffset('+05:30').format('HH:mm');

    res.status(200).json({state, city, weather, desc, temp_Celsius, feelsLike_Celsius, sunset, date: formattedDate})

  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};