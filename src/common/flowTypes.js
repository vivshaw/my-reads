// @flow

/* -------------------------- SHARED TYPES -------------------------- */

/**
 * Book object type, returned as JSOn from the BooksAPI
 * @type {BooKType}
 * @prop {Array<string>} authors				the book's authors
 * @prop {string} description						a short description of the book
 * @prop {string} id 										a unique identifier for the book
 * @prop {string} imageLinks.thumbnail	the url to a thumbnail of the book's cover
 * @prop {string} shelf									what shelf the book is on
 * @prop {string} subtitle							the book's subtitle
 * @prop {string} title									the book's title
 */
export type BookType = {
	authors: Array<string>,
	description: string,
	id: string,
	imageLinks: {
		thumbnail: string
	},
	shelf: string,
	subtitle: string,
	title: string
};
