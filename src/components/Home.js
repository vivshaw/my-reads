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
		clearQuery: () => void,
		handleShelfUpdate: (string, string) => void,
		findShelf: string => string
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
		const {
			books,
			shelves,
			filterQuery,
			clearQuery,
			handleShelfUpdate,
			findShelf
		} = this.props;

		const shelvedBooks = shelves.reduce((map, shelf) => {
			map[shelf] = books.filter(book => book.shelf === shelf);
			return map;
		}, {});

		const shelfTabs = shelves.map(shelf => {
			return (
				<Tab
					key={shelf + '-tab'}
					label={shelf}
					value={shelves.indexOf(shelf)}
				/>
			);
		});

		const showingShelves = shelves.map(shelf => {
			return (
				<Shelf
					key={shelf + '-id'}
					title={shelf}
					books={shelvedBooks[shelf]}
					filterQuery={filterQuery}
					clearQuery={clearQuery}
					handleShelfUpdate={handleShelfUpdate}
					findShelf={findShelf}
				/>
			);
		});

		return (
			<div className="home">
				<Tabs onChange={this.handleTabChange} value={this.state.slideIndex}>
					{shelfTabs}
				</Tabs>
				<SwipeableViews
					index={this.state.slideIndex}
					onChangeIndex={this.handleTabChange}
					animateHeight={true}
				>
					{showingShelves}
				</SwipeableViews>
			</div>
		);
	}
}

export default Home;
