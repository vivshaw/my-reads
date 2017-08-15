// @flow

import React from 'react';
import escapeRegExp from 'escape-string-regexp';

import BookList from './BookList';

import type { BookType } from '../common/flowTypes';

const shelfStyle = { padding: 10 };

const Shelf = (props: {
	title: string,
	books: Array<BookType>,
	filterQuery: string,
	clearQuery: () => void,
	handleShelfUpdate: (BookType, string) => void,
	findShelf: string => string
}) => {
	const {
		books,
		filterQuery,
		clearQuery,
		handleShelfUpdate,
		findShelf
	} = props;
	let showingBooks;

	if (filterQuery) {
		const match = new RegExp(escapeRegExp(filterQuery), 'i');
		showingBooks = books.filter(
			book => match.test(book.title) || match.test(book.subtitle)
		);
	} else {
		showingBooks = books;
	}

	return (
		<div style={shelfStyle} className="shelf">
			{books.length !== showingBooks.length &&
				<div className="filtered-books-ui">show all</div>}

			<BookList
				books={showingBooks}
				handleShelfUpdate={handleShelfUpdate}
				findShelf={findShelf}
			/>
		</div>
	);
};

export default Shelf;
