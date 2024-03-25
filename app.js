const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const apiKey = process.env.API_KEY;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: apiKey,
                q: 'Long Beach',
                aqi: 'yes',
                alerts: 'yes',
                days: 7
            }
        });

        response.data.forecast.forecastday.forEach(day => {
            day.day.condition.text = getShortDescription(day.day.condition.text);
        });

        res.render('index', { data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching weather data.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: apiKey,
                q: req.query.city,
                aqi: 'yes',
                alerts: 'yes',
                days: 7
            }
        });

        response.data.forecast.forecastday.forEach(day => {
            day.day.condition.text = getShortDescription(day.day.condition.text);
        });

        res.render('index', { data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching weather data.');
    }
});

app.get('/autocomplete/:query', async (req, res) => {
    const query = req.params.query;
    const key = apiKey;
    const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from WeatherAPI:', error);
        res.status(500).send('Error fetching data');
    }
});


function getShortDescription(conditionText) {
    const lowerCaseText = conditionText.toLowerCase();
    if (lowerCaseText.includes('sunny')) return 'Sunny';
    if (lowerCaseText.includes('cloudy')) return 'Cloudy';
    if (lowerCaseText.includes('overcast')) return 'Overcast';
    if (lowerCaseText.includes('mist')) return 'Misty';
    if (lowerCaseText.includes('rain')) return 'Rain';
    if (lowerCaseText.includes('snow')) return 'Snow';
    if (lowerCaseText.includes('sleet')) return 'Sleet';
    if (lowerCaseText.includes('drizzle')) return 'Drizzle';
    if (lowerCaseText.includes('thunder')) return 'Thunder';
    return conditionText; 
}
