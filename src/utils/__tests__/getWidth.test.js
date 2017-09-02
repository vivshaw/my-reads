import getWidth, { widths } from '../getWidth';

describe('getWidth', () => {
	it('returns the correct width', () => {
		window.innerWidth = 993;
		expect(getWidth()).toEqual(widths.large);
		window.innerWidth = 800;
		expect(getWidth()).toEqual(widths.medium);
		window.innerWidth = 360;
		expect(getWidth()).toEqual(widths.small);
	});
});
