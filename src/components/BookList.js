// @flow

import React from 'react';

import Book from './Book';
import type { BookType } from '../common/flowTypes';

const bookListStyle = {
	display: 'flex',
	flexWrap: 'wrap',
	marginTop: '12px',
	marginBottom: '12px',
	justifyContent: 'center'
};

const BookList = (props: {
	books: Array<BookType>,
	handleShelfUpdate: (BookType, string) => void,
	findShelf: string => string
}) => {
	const { books, handleShelfUpdate, findShelf } = props;

	const FilteredBookElements = books.map(book => {
		return (
			<Book
				book={book}
				key={book.id}
				handleShelfUpdate={handleShelfUpdate}
				findShelf={findShelf}
			/>
		);
	});

	return (
		<div style={bookListStyle} className="book-list">
			{FilteredBookElements}
		</div>
	);
};

export default BookList;
