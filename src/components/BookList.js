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

const BookList = (props: { books: Array<BookType> }) => {
	const { books, handleShelfUpdate, findShelf } = props;

	const FilteredBookElements = books.map(book => {
		return (
			<Book
				key={book.id}
				title={book.title}
				subtitle={book.subtitle}
				description={book.description}
				authors={book.authors}
				coverImageUrl={book.imageLinks.thumbnail}
				book={book}
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
