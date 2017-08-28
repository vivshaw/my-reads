/* Set up mock for localStorage so that our tests will run */

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn()
};

global.localStorage = localStorageMock;
global.fetch = require('jest-fetch-mock');
