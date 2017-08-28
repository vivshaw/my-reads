// @flow

// Utils/Common
import type { BookType } from '../common/flowTypes';

/* 	Modified versions of provided helper methods from Udacity BooksAPI. I've
		tweaked them a bit and added Flow to them */

/** Books API endpoint */
const api = 'https://reactnd-books-api.udacity.com';

/* Access token for books API */
let token;

/* Generate a unique token for storing your bookshelf data on the backend server.
   If not rendering in a browser, generate a random token. */
try {
	token = localStorage.getItem('token');
	if (!token) {
		token = Math.random().toString(36).substr(-8);
		localStorage.setItem('token', token);
	}
} catch (e) {
	token = Math.random().toString(36).substr(-8);
}

/**
 * Translates an insecure http  url to a secure https one.
 * @param  {string} url insecure url
 * @return {string}     https url
 */
const defaultToHTTPS = url => 'https' + url.substring(4);

/* JSON headers for books API */
const headers = {
	Accept: 'application/json',
	Authorization: token
};

/**
 * Fetch one book from the API, by id.
 * @param  {string} bookId id of the book to get
 * @return {BookType}      the fetched book
 */
export const get = (bookId: string) =>
	fetch(`${api}/books/${bookId}`, { headers })
		.then(res => res.json())
		.then(data => data.book);

/**
 * Fetch all books on a user's shelves
 * @return {Array<BookType>} All books the user has shelved
 */
export const getAll = () =>
	fetch(`${api}/books`, { headers })
		.then(res => res.json())
		.then(data => data.books)
		.then(books =>
			books.map(book => {
				const secureImageUrl = defaultToHTTPS(book.imageLinks.thumbnail);
				return Object.assign({}, book, {
					imageLinks: { thumbnail: secureImageUrl }
				});
			})
		);

/**
 * Update a book's shelf.
 * @param  {BookType} book  	the book to update
 * @param  {string} 	shelf 	the shelf to put it on
 */
export const update = (book: BookType, shelf: string) =>
	fetch(`${api}/books/${book.id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ shelf })
	}).then(res => res.json());

/**
 * Search for books. Allowed search terms are in {@link searchTerms}
 * @param  {string} query      	the terms to search for
 * @param  {number} maxResults 	how many results, at maximum, to return
 * @return {Array<BookType>}   	books matching the query
 */
export const search = (query: string, maxResults: number) =>
	fetch(`${api}/search`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query, maxResults })
	})
		.then(res => res.json())
		.then(data => data.books);
