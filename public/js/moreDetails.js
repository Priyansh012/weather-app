const path = window.location.pathname;
const pathSegments = path.split('/');
const date = pathSegments[pathSegments.length - 1];
const weatherData = JSON.parse(localStorage.getItem('weatherData'));

if (Array.isArray(weatherData.data)) {
    const dataForDate = weatherData.data.find(data => data.date === date);

    if (dataForDate) {
        document.getElementById('date').textContent = dataForDate.date;
        document.getElementById('avgTemp').textContent = dataForDate.day.avgtemp_f;
        document.getElementById('maxTemp').textContent = dataForDate.day.maxtemp_f;
        document.getElementById('minTemp').textContent = dataForDate.day.mintemp_f;
        document.getElementById('humidity').textContent = dataForDate.day.avghumidity;
        document.getElementById('maxWind').textContent = dataForDate.day.maxwind_mph;
        document.getElementById('totalPrecip').textContent = dataForDate.day.totalprecip_mm;
        document.getElementById('uvIndex').textContent = dataForDate.day.uv;
        document.getElementById('sunrise').textContent = dataForDate.astro.sunrise;
        document.getElementById('sunset').textContent = dataForDate.astro.sunset;
        document.getElementById('conditionIcon').src = dataForDate.day.condition.icon;
        document.getElementById('conditionText').textContent = dataForDate.day.condition.text;
    } else {
        console.error('No data found for the specified date.');
    }
} else {
    console.error('No weather data found in localStorage.');
}