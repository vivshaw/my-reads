// @flow

// Vendor
import React from 'react';
import styled from 'styled-components';

// Components
import Book from './Book';

// Utils/Common
import type { BookType } from '../common/flowTypes';

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/** A flexbox grid wrapper, into which we insert our Books */
const FlybraryBookList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 12px;
	margin-top: 12px;
`;

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
	books: Array<BookType>,
	findShelf: string => string,
	handleShelfUpdate: (BookType, string) => void
};

/**
 * View component that displays a list of Books.
 * @param {Array<BookType>}   books   	An Array of Book data objects to be displayed
 * @param {function(string, string)} handleShelfUpdate from {@link App#handleShelfUpdate}
 * @param {function(string)} findShelf from {@link App#findShelf}
 */
const BookList = (props: Props) => {
	const { books, handleShelfUpdate, findShelf } = props;

	// Map our book data objects into Book components
	const bookElements = books.map(book => {
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
			{bookElements}
		</FlybraryBookList>
	);
};

export default BookList;
