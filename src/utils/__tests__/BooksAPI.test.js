import { get, getAll, update, search } from '../BooksAPI';
import { testBooks, secureTestBooks, jsonHeaders } from '../../common/testData';

describe('BooksAPI', () => {
	it('fetches all books with getAll', () => {
		const mockBooksData = testBooks;
		fetch.mockResponse(JSON.stringify(mockBooksData), { jsonHeaders });

		return getAll().then(returnedBooks => {
			expect(returnedBooks).toEqual(secureTestBooks);
		});
	});

	it('fetches one book with get', () => {
		const mockBookData = { book: testBooks.books[0] };
		const bookId = mockBookData.book.id;
		fetch.mockResponse(JSON.stringify(mockBookData), { jsonHeaders });

		return get(bookId).then(returnedBook => {
			expect(returnedBook).toEqual(mockBookData.book);
		});
	});

	it("updates a book's shelf with update", () => {
		const mockBook = testBooks.books[0];
		const newShelf = 'read';
		const expectedBook = Object.assign({}, mockBook, { shelf: newShelf });
		fetch.mockResponse(JSON.stringify(expectedBook), { jsonHeaders });

		return update(mockBook, newShelf).then(returnedBook => {
			expect(returnedBook).toEqual(expectedBook);
		});
	});

	it('searches with search', () => {
		const query = 'test';
		const maxResults = 1;
		const mockBooksData = testBooks;
		fetch.mockResponse(JSON.stringify(mockBooksData), { jsonHeaders });

		return search(query, maxResults).then(returnedBooks => {
			expect(returnedBooks).toEqual(mockBooksData.books);
		});
	});
});
