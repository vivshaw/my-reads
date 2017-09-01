import { shelfData } from '../commonData';

describe('commonData', () => {
	describe('shelfData', () => {
		it('getShelfWithWidth returns a shelf', () => {
			const shelf = 'wantToRead';
			expect(shelfData.getShelfWithWidth(shelf)).toEqual(
				shelfData[shelf].narrow
			);
		});
	});
});
