// @flow

import React from 'react';
import { Card } from 'semantic-ui-react';
import type { BookType } from '../common/flowTypes';

import Book from './Book';

const BookList = (props: { books: Array<BookType> }) => {
	const { books } = props;

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
			/>
		);
	});

	return (
		<Card.Group>
			{FilteredBookElements}
		</Card.Group>
	);
};

export default BookList;
