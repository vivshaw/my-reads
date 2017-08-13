// @flow

import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import Shelf from './Shelf';
import type { BookType } from '../common/flowTypes';

class Home extends Component {
	props: {
		books: Array<BookType>,
		shelves: Array<string>,
		filterQuery: string,
		clearQuery: () => void
	};

	state = {
		slideIndex: 0
	};

	handleTabChange = (value: number) => {
		this.setState({
			slideIndex: value
		});
	};

	render() {
		const { books, shelves, filterQuery, clearQuery } = this.props;

		const shelvedBooks = shelves.reduce((map, shelf) => {
			map[shelf] = books.filter(book => book.shelf === shelf);
			return map;
		}, {});

		const shelfTabs = shelves.map(shelf => {
			return <Tab label={shelf} value={shelves.indexOf(shelf)} />;
		});

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
			<div>
				<Tabs onChange={this.handleTabChange} value={this.state.slideIndex}>
					{shelfTabs}
				</Tabs>
				<SwipeableViews
					index={this.state.slideIndex}
					onChangeIndex={this.handleTabChange}
				>
					{showingShelves}
				</SwipeableViews>
			</div>
		);
	}
}

export default Home;
