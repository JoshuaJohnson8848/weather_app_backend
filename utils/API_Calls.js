const axios = require('axios');
const { currentDayAPI, latAndlonAPI, hourlyAPI } = require('./API_URL');

async function getLatAndLon(cityName, stateCode, countryCode, limit, apiKey) {
    try {
        const response = await axios.get(currentDayAPI(cityName, stateCode, countryCode, limit, apiKey));
        const data = response.data[0];
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getCurrentDayWeather(lat,lon,apiKey) {
    try {
        const response = await axios.get(latAndlonAPI(lat,lon,apiKey));
        const data = response?.data;
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getHourlyWeather(lat,lon,apiKey) {
    try {
        const response = await axios.get(hourlyAPI(lat,lon,apiKey));
        const data = response?.data;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getLatAndLon, getCurrentDayWeather, getHourlyWeather };