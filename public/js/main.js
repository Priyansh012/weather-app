const searchBox = document.getElementById('searchBox');
const suggestionsBox = document.getElementById('suggestions');
const cardsContainer = document.querySelector('.container .row');
const spinner = document.querySelector('.spinner-border');

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
    showSpinnerAndHideCards();
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
