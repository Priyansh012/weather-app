const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: 'eb5e8ff205f049e98d3233534242303',
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
                key: 'eb5e8ff205f049e98d3233534242303',
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
