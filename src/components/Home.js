// @flow

import React from 'react';
import { Sidebar } from 'semantic-ui-react';

import Shelf from './Shelf';
import type { BookType } from '../common/flowTypes';

const Home = (props: {
	books: Array<BookType>,
	shelves: Array<string>,
	filterQuery: string,
	clearQuery: () => void
}) => {
	const { books, shelves, filterQuery, clearQuery } = props;

	const shelvedBooks = shelves.reduce((map, shelf) => {
		map[shelf] = books.filter(book => book.shelf === shelf);
		return map;
	}, {});

	const showingShelves = shelves.map(shelf => {
		return (
			<Shelf
				key={shelf + '-id'}
				title={shelf}
				books={shelvedBooks[shelf]}
				filterQuery={filterQuery}
				clearQuery={clearQuery}
			/>
		);
	});

	return (
		<Sidebar.Pusher>
			{showingShelves}
		</Sidebar.Pusher>
	);
};

export default Home;
