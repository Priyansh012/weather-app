const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const apiKey = process.env.API_KEY;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const city = 'Long Beach';
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 5;
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: apiKey,
                q: city,
                aqi: 'yes',
                alerts: 'yes',
                days: 10
            }
        });

        const location = `${response.data.location.name}, ${response.data.location.region}, ${response.data.location.country}`;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const forecastDays = response.data.forecast.forecastday.slice(start, end);

        res.render('index', { location: location, data: forecastDays, page:page });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching weather data.');
    }
});

if (process.env.NODE_ENV !== 'test') {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
  

app.get('/weather', async (req, res) => {
    try {
        const lat = req.query.lat;
        const lon = req.query.lon;
        const city = req.query.city || `${lat},${lon}`;
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 5;
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: apiKey,
                q: city,
                aqi: 'yes',
                alerts: 'yes',
                days: 10
            }
        });

        const location = `${response.data.location.name}, ${response.data.location.region}, ${response.data.location.country}`;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const forecastDays = response.data.forecast.forecastday.slice(start, end);

        if (req.query.format === 'json') {
            res.json({ location: location, data: forecastDays, page: page });
        } else {
            res.render('index', { location: location, data: forecastDays, page: page });
        }
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

app.get('/api/weather', async (req, res) => {
    try {
        const city = 'Long Beach';
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 5;
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: apiKey,
                q: city,
                aqi: 'yes',
                alerts: 'yes',
                days: 10
            }
        });

        const location = `${response.data.location.name}, ${response.data.location.region}, ${response.data.location.country}`;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const forecastDays = response.data.forecast.forecastday.slice(start, end);

        res.json({ location: location, data: forecastDays, page: page });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching weather data.');
    }
});

app.get('/weather-json', async (req, res) => {
    try {
        const lat = req.query.lat;
        const lon = req.query.lon;
        const city = req.query.city || `${lat},${lon}`;
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 5;
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: apiKey,
                q: city,
                aqi: 'yes',
                alerts: 'yes',
                days: 10
            }
        });

        const location = `${response.data.location.name}, ${response.data.location.region}, ${response.data.location.country}`;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const forecastDays = response.data.forecast.forecastday.slice(start, end);

        res.json({ location: location, data: forecastDays, page: page });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching weather data.');
    }
});

app.get('/details/:day', async (req, res) => {
    const day = req.params.day;
    res.render('details', {});
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

module.exports = {
    app,
    getShortDescription
};
