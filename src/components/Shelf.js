// @flow

import React from 'react';
import escapeRegExp from 'escape-string-regexp';

import type { BookType } from '../common/flowTypes';
import BookList from './BookList';

const shelfStyle = { padding: 10 };

const Shelf = (props: {
	title: string,
	books: Array<BookType>,
	filterQuery: string,
	clearQuery: () => void
}) => {
	const { books, filterQuery, clearQuery } = props;
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
			{books.length !== showingBooks.length && <div>show all</div>}

			<BookList books={showingBooks} />
		</div>
	);
};

export default Shelf;
