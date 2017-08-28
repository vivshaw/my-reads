// @flow

// Vendor
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

// Material-UI components
import { Tab, Tabs } from 'material-ui/Tabs';

// Components
import Shelf from './Shelf';

// Utils/Common
import type { BookType } from '../common/flowTypes';
import getWidth, { widths } from '../utils/getWidth';

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
	books: Array<BookType>,
	clearQuery: () => void,
	filterQuery: string,
	findShelf: string => string,
	handleShelfUpdate: (BookType, string) => void,
	shelves: Array<string>
};

/**
 * Home page component, located at route /shelves
 * @param {Array<BookType>} books  the array of all Books the user has
 * @param {Array<string>} shelves		the array of all bookshelves
 * @param {string} filterQuery 		the query to filter all displaying books by
 * @param {function()} clearQuery  from {@link App#clearQuery}
 * @param {function(string, string)} handleShelfUpdate from {@link App#handleShelfUpdate}
 * @param {function(string)} findShelf from {@link App#findShelf}
 */
class Home extends Component {
	props: Props;

	state = {
		slideIndex: 0
	};

	/**
	 * Controller for SwipeableViews tabs component
	 * @param  {number} value The number of the tab to display
	 */
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

		const wide = getWidth() === widths.large;

		const shelfText = {
			read: {
				narrow: 'Read',
				wide: 'Read'
			},
			wantToRead: {
				narrow: 'Want',
				wide: 'Want to Read'
			},
			currentlyReading: {
				narrow: 'Current',
				wide: 'Currently Reading'
			}
		};

		const shelvedBooks = shelves.reduce((map, shelf) => {
			map[shelf] = books.filter(book => book.shelf === shelf);
			return map;
		}, {});

		const shelfTabs = shelves.map(shelf => {
			return (
				<Tab
					key={shelf + '-tab'}
					label={wide ? shelfText[shelf].wide : shelfText[shelf].narrow}
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
				<Tabs
					className="shelf-tabs"
					onChange={this.handleTabChange}
					value={this.state.slideIndex}
				>
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
