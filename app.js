const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { message: "Hello, World!" });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 
app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: 'eb5e8ff205f049e98d3233534242303',
                q: 'Long Beach'
            }
        });
        res.render('weather', { data: response.data });
    } catch (error) {
        console.error(error);
    }
});