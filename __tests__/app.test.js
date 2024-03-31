jest.mock('axios');
const axios = require('axios');
const request = require('supertest');
const { app, getShortDescription } = require('../app.js');

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
