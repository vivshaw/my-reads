import getWidth, { widths } from '../getWidth';

describe('getWidth', () => {
	it('returns a width', () => {
		window.innerWidth = 993;
		expect(getWidth()).toEqual(widths.large);
	});
});
