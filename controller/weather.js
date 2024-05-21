const Weather = require('../../models/weather');

exports.createWeather = async (req, res, next) => {
  try {
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
