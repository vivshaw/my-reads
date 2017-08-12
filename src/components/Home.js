// @flow

import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

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
			<div>
				<AppBar
					title="flybrary"
					iconElementRight={<FlatButton label="Filter" />}
				/>

				<Shelf
					key={shelf + '-id'}
					title={shelf}
					books={shelvedBooks[shelf]}
					filterQuery={filterQuery}
					clearQuery={clearQuery}
				/>
			</div>
		);
	});

	return (
		<Sidebar.Pusher>
			{showingShelves}
		</Sidebar.Pusher>
	);
};

export default Home;
