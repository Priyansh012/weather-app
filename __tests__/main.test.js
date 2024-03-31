const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
    <div class="spinner-border" style="opacity: 0;"></div>
    <div class="container">
        <div class="row" style="display: flex;"></div>
    </div>
    <input id="searchBox" />
    <form class="search-bar"></form>
    <button id="previousButton"></button>
    <button id="nextButton"></button>
`);
global.document = dom.window.document;
global.window = dom.window;

const { showSpinnerAndHideCards } = require('../public/js/main.js');

describe('showSpinnerAndHideCards', () => {
    it('shows the spinner and hides the cards', () => {
        showSpinnerAndHideCards();

        const spinner = document.querySelector('.spinner-border');
        const cardsContainer = document.querySelector('.container .row');

        expect(spinner.style.opacity).toBe('0');
        expect(cardsContainer.style.display).toBe('none');
    });
});