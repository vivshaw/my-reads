import { shelfData } from '../commonData';

describe('commonData', () => {
	describe('shelfData', () => {
		it('returns full shelf name on large screens', () => {
			const shelf = 'wantToRead';
			window.innerWidth = 993;

			expect(shelfData.getShelfWithWidth(shelf)).toEqual(shelfData[shelf].wide);
		});

		it('returns truncated shelf name on small screens', () => {
			const shelf = 'wantToRead';
			window.innerWidth = 300;

			expect(shelfData.getShelfWithWidth(shelf)).toEqual(
				shelfData[shelf].narrow
			);
		});
	});
});
