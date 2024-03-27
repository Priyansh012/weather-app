const searchBox = document.getElementById('searchBox');
const suggestionsBox = document.getElementById('suggestions');


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
            div.innerText = suggestion.name+", "+suggestion.region+", "+suggestion.country;
            div.classList.add('suggestion-item');
            div.addEventListener('click', () => {
                searchBox.value = suggestion.name;
                suggestionsBox.style.display = 'none';
                document.querySelector('.search-bar').submit();
            });
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    fetch(`/weather-json?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('searchBox').value = data.location;
        })
        .catch(error => console.error('Error:', error));
}
