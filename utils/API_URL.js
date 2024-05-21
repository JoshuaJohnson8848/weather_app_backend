const latAndlonAPI = (lat,lon,apiKey) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}

const hourlyAPI = (lat,lon,apiKey) => {
    return `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}

const currentDayAPI = (cityName,stateCode,countryCode,limit,apiKey) => {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;
}


const cityName = 'Ernakulam';
const stateCode = 'KL';
const countryCode = 'IN';
const limit = 1;

module.exports = { currentDayAPI, latAndlonAPI, hourlyAPI, cityName, stateCode, countryCode, limit }