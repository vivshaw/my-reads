import { getAllRatings, getRating, setRating } from '../RatingsAPI';
import { testBooks } from '../../common/testData';

describe('RatingsAPI', () => {
	it('gets all ratings', () => {
		getAllRatings();
		expect(global.localStorage.getItem).toHaveBeenCalled();
	});

	it('gets a particular rating', () => {
		const book = testBooks.books[0];
		getRating(book.id);
		expect(global.localStorage.getItem).toHaveBeenCalled();
	});

	it("sets a book's rating", () => {
		const book = testBooks.books[0];
		setRating(book.id, 5);
		expect(global.localStorage.setItem).toHaveBeenCalled();
	});

	it('returns 0 for an unratd book', () => {
		const book = testBooks.books[0];

		expect(getRating(book.id)).toEqual(0);
	});
});
