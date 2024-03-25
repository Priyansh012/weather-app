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
