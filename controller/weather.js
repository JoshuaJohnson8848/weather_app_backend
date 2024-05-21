const { getLatAndLon, getCurrentDayWeather, getHourlyWeather } = require('../utils/API_Calls');
const { cityName, stateCode, limit, countryCode } = require('../utils/API_URL');
const apiKey = require('../config/credentials');
const moment = require('moment');
const Weather = require('../models/weather');

exports.currentDayWeather = async (req, res, next) => {
  try {
    let result = await getLatAndLon(cityName,stateCode,countryCode,limit,apiKey);
    const state = result.state;
    const city = result.name;

    let currentDay = await getCurrentDayWeather(result?.lat,result?.lon,apiKey);

    const formattedDate = moment.unix(currentDay?.dt).format('D MMMM YYYY');
    const weather = currentDay?.weather[0]?.main;
    const icon = currentDay?.weather[0]?.icon;
    const desc = currentDay?.weather[0]?.description;
    const temp_Celsius = Math.floor(currentDay?.main?.temp - 273.15);
    const feelsLike_Celsius = Math.floor(currentDay?.main?.feels_like - 273.15);
    const sunset = moment.unix(currentDay?.sys?.sunset).utcOffset('+05:30').format('HH:mm');

    const existData = await Weather.findOne({date:formattedDate});

    if(!existData){
      const weatherData = new Weather({
        state: state,
        city: city,
        weather: weather,
        desc: desc,
        temp_Celsius: temp_Celsius,
        feelsLike_Celsius: feelsLike_Celsius,
        sunset: sunset,
        date: formattedDate
      })

      let created = await weatherData.save();
      
      if(!created){
        const error = new Error('Not Created');
        error.status = 422;
        throw error;
      }
    }

    res.status(200).json({state, city, weather, desc, temp_Celsius, feelsLike_Celsius, sunset, date: formattedDate,icon})

  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.hourlyWeather = async (req, res, next) => {
    try {
      let result = await getLatAndLon(cityName,stateCode,countryCode,limit,apiKey);
      console.log(result);
      let hourlyWeather = await getHourlyWeather(result?.lat,result?.lon,apiKey);
       
      let arr = []
      const currentDate = moment().format('YYYY-MM-DD');

      const todaysData = hourlyWeather?.list?.filter(item => moment(item.dt_txt).format('YYYY-MM-DD') === currentDate);

      todaysData?.list?.forEach(elem => {
        arr.push({ time: moment(elem?.dt_txt).format("h A") , temp: elem?.main?.temp})
      });

      let sorted = arr?.sort((a,b)=>{
        const hourA = parseInt(a.time.split(' ')[0]);
        const hourB = parseInt(b.time.split(' ')[0]);

        return hourA - hourB;
      })

      res.status(200).json({hourly: sorted})

    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  };
  
