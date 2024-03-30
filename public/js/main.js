const searchBox = document.getElementById('searchBox');
let mainCity=searchBox.defaultValue;
const suggestionsBox = document.getElementById('suggestions');
const cardsContainer = document.querySelector('.container .row');
const spinner = document.querySelector('.spinner-border');
const urlParams = new URLSearchParams(window.location.search);
const date = urlParams.get('date');
let highlightedCard = null;

searchBox.addEventListener('input', () => {
    const inputText = searchBox.value;

    if (inputText.length > 2) {
        fetchSuggestions(inputText);
    } else {
        suggestionsBox.style.display = 'none';
    }
});

async function fetchSuggestions(query) {
    const url = `/autocomplete/${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySuggestions(data);
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
    }
}

function displaySuggestions(suggestions) {
    suggestionsBox.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.innerText = suggestion.name + ", " + suggestion.region + ", " + suggestion.country;
            div.classList.add('suggestion-item');
            div.addEventListener('click', () => {
                searchBox.value = suggestion.name;
                suggestionsBox.style.display = 'none';
                showSpinnerAndHideCards();
                setTimeout(() => {
                    document.querySelector('.search-bar').submit();
                }, 250);
                fetchWeatherData(suggestion.name, 1);
                window.location.href = `/weather?city=${suggestion.name}&page=1`;
            });
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = 'block';
        setTimeout(() => {
            suggestionsBox.style.transform = 'scaleY(1)';
            suggestionsBox.style.opacity = '1';
        }, 100)
    } else {
        suggestionsBox.style.transform = 'scaleY(0)';
        suggestionsBox.style.opacity = '0';
        setTimeout(() => {
            suggestionsBox.style.display = 'none';
        }, 300);
    }
}

document.querySelector('.search-bar').addEventListener('submit', (e) => {
    e.preventDefault();
    showSpinnerAndHideCards();
    fetchWeatherData(searchBox.value, 1);
    window.location.href = `/weather?city=${searchBox.value}&page=1`;
});

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    fetch(`/weather-json?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('searchBox').value = data.location;
            showSpinnerAndHideCards();
            hideSpinnerAndShowCards();
            fetchWeatherData(data.location, 1);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showSpinnerAndHideCards() {
    if (spinner) {
        spinner.style.display = 'block';
        setTimeout(() => spinner.style.opacity = '1', 10);
    }
    if (cardsContainer) cardsContainer.style.display = 'none';
}

function hideSpinnerAndShowCards() {
    if (spinner) spinner.style.opacity = '0';
    setTimeout(() => {
        if (spinner) spinner.style.display = 'none';
    }, 500);
    if (cardsContainer) cardsContainer.style.display = 'flex';

}

document.addEventListener('DOMContentLoaded', function () {
    hideSpinnerAndShowCards();
});


function highlightCard(card) {
    if (highlightedCard) {
        unhighlightCard(highlightedCard);
    }
    card.classList.add('highlight');
    highlightedCard = card;
}

function unhighlightCard(card) {
    card.classList.remove('highlight');
}

document.addEventListener('click', function (event) {
    if (highlightedCard && !highlightedCard.contains(event.target) && event.target !== highlightedCard) {
        unhighlightCard(highlightedCard);
        highlightedCard = null;
    }
});

function fetchWeatherData(city, page) {
    fetch(`/weather-json?city=${city}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('weatherData', JSON.stringify(data));
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('previousButton').addEventListener('click', function(event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    const city = url.searchParams.get('city');
    const page = url.searchParams.get('page');
    fetchWeatherData(city, page);
    window.location.href = event.target.href;
});

document.getElementById('nextButton').addEventListener('click', function(event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    const city = url.searchParams.get('city');
    const page = url.searchParams.get('page');
    fetchWeatherData(city, page);
    window.location.href = event.target.href;
});


if (window.location.pathname === '/') {
    fetch('/api/weather')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('weatherData', JSON.stringify(data));
        })
        .catch(error => console.error('Error:', error));
}