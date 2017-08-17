// @flow

import React from 'react';
import styled from 'styled-components';

import Book from './Book';

import type { BookType } from '../common/flowTypes';

const FlybraryBookList = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 12px;
	margin-bottom: 12px;
	justify-content: center;
`;

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
		<FlybraryBookList className="book-list">
			{FilteredBookElements}
		</FlybraryBookList>
	);
};

export default BookList;
