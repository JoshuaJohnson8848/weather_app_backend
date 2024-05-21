const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    temp_Celsius: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    feelsLike_Celsius: {
        type: String,
        required: true
    },
    sunset: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Weather', weatherSchema);