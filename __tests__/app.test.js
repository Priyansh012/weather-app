jest.mock('axios');
const axios = require('axios');
const request = require('supertest');
const app = require('../app.js'); 
const { getShortDescription } = require('../app.js');

describe('getShortDescription', () => {
    it('correctly identifies "Sunny"', () => {
        expect(getShortDescription('Partly sunny')).toBe('Sunny');
    });

    it('correctly identifies "Rainy"', () => {
        expect(getShortDescription('Heavy rain showers')).toBe('Rain');
    });

    it('correctly identifies "Cloudy"', () => {
        expect(getShortDescription('Partly cloudy')).toBe('Cloudy');
    });

    it('correctly identifies "Snowy"', () => {
        expect(getShortDescription('Heavy snowfall')).toBe('Snow');
    });

    it('returns the same input if no matching description is found', () => {
        expect(getShortDescription('Unknown condition')).toBe('Unknown condition');
    });
});

describe('GET /', () => {
    it('renders the index page with weather data', async () => {
      axios.get.mockResolvedValue({
        data: {
          location: {
            name: "Long Beach",
            region: "California",
            country: "USA"
          },
          forecast: {
            forecastday: [{
                "time_epoch": 1711677600,
                "time": "2024-03-29 02:00",
                "temp_c": 8.1,
                "temp_f": 46.5,
                "is_day": 0,
                "condition": {
                    "text": "Heavy rain showers",
                    "icon": "//cdn.weatherapi.com/weather/64x64/night/296.png",
                    "code": 1183
                },
                "wind_mph": 15.9,
                "wind_kph": 25.6,
                "wind_degree": 210,
                "wind_dir": "SSW",
                "pressure_mb": 982.0,
                "pressure_in": 29.01,
                "precip_mm": 0.9,
                "precip_in": 0.04,
                "snow_cm": 0.0,
                "humidity": 85,
                "cloud": 100,
                "feelslike_c": 4.9,
                "feelslike_f": 40.8,
                "windchill_c": 4.9,
                "windchill_f": 40.8,
                "heatindex_c": 8.1,
                "heatindex_f": 46.5,
                "dewpoint_c": 5.8,
                "dewpoint_f": 42.4,
                "will_it_rain": 1,
                "chance_of_rain": 97,
                "will_it_snow": 0,
                "chance_of_snow": 0,
                "vis_km": 9.0,
                "vis_miles": 5.0,
                "gust_mph": 22.6,
                "gust_kph": 36.4,
                "uv": 1.0,
                "air_quality": {
                    "co": 230.9,
                    "no2": 5.8,
                    "o3": 74.4,
                    "so2": 3.3,
                    "pm2_5": 0.6,
                    "pm10": 1.4,
                    "us-epa-index": 1,
                    "gb-defra-index": 1
                },
                "short_rad": 0.0,
                "diff_rad": 0.0
            }]
          }
        }
      });
  
      const response = await request(app).get('/');
  
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain("Long Beach, California, USA"); 
    });
});
