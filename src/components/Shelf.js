// @flow

import React from 'react';
import styled from 'styled-components';
import escapeRegExp from 'escape-string-regexp';

import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';

import BookList from './BookList';

import type { BookType } from '../common/flowTypes';

const FlybraryShelf = styled.div`padding: 10px;`;

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
		<FlybraryShelf className="shelf">
			{books.length !== showingBooks.length &&
				<Subheader className="filtered-books-ui">
					Now showing {showingBooks.length} of {books.length}.
					<FlatButton label="Show All" onClick={clearQuery} secondary={true} />
				</Subheader>}

			<BookList
				books={showingBooks}
				handleShelfUpdate={handleShelfUpdate}
				findShelf={findShelf}
			/>
		</FlybraryShelf>
	);
};

export default Shelf;
