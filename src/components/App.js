// @flow

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { snapshot } from 'react-snapshot';
import Loadable from 'react-loadable';

import Snackbar from 'material-ui/Snackbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {
	deepOrange200,
	deepOrange400,
	darkWhite
} from 'material-ui/styles/colors';

import TopBar from './TopBar';
import SideBar from './SideBar';

import { getAll } from '../utils/BooksAPI';
import type { BookType } from '../common/flowTypes';

const Landing = Loadable({
	loader: () => import('./Landing'),
	loading: () => null
});

const Shelves = Loadable({
	loader: () => import('./Home'),
	loading: () => null
});

const Search = Loadable({
	loader: () => import('./Search'),
	loading: () => null
});

const flybraryTheme = getMuiTheme({
	...lightBaseTheme,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: deepOrange200,
		primary2Color: deepOrange400,
		primary3Color: darkWhite
	},
	appBar: {
		titleFontWeight: typography.fontWeightLight
	},
	card: {
		fontWeight: typography.fontWeightLight
	}
});

class App extends Component {
	state = {
		books: [],
		filterQuery: '',
		menuVisible: false,
		shelves: [],
		snackbarOpen: false,
		snackbarData: { shelf: '', title: '' }
	};

	toggleMenu = () => {
		this.setState(state => ({ menuVisible: !state.menuVisible }));
	};

	handleSetMenuVisible = (menuVisible: boolean) => {
		this.setState({ menuVisible });
	};

	handleMenuClose = () => this.setState({ menuVisible: false });

	handleFilterChange = (query: string) => {
		this.setState({ filterQuery: query.trim() });
	};

	handleFilterClear = () => {
		this.setState({ filterQuery: '' });
	};

	handleSnackbarOpen = () => {
		this.setState({ snackbarOpen: true });
	};

	handleRequestClose = () => {
		this.setState({ snackbarOpen: false });
	};

	handleShelfUpdate = (targetBook: BookType, shelf: string) => {
		this.setState(({ books }) => {
			const targetBookIndex = books.findIndex(
				book => book.id === targetBook.id
			);

			if (targetBookIndex !== -1) {
				books[targetBookIndex].shelf = shelf;
			} else {
				books.push(Object.assign({}, targetBook, { shelf }));
			}
			return { books, snackbarData: { title: targetBook.title, shelf: shelf } };
		});
		this.handleSnackbarOpen();
	};

	findShelf = (id: string) => {
		const book = this.state.books.find(book => book.id === id);
		if (book) {
			return book.shelf;
		} else {
			return '';
		}
	};

	componentDidMount() {
		snapshot(() => getAll()).then((books: Array<BookType>) => {
			const shelves = Array.from(new Set(books.map(book => book.shelf)));
			this.setState({
				books,
				shelves
			});
		});
	}

	render() {
		const { filterQuery, shelves, books, snackbarData } = this.state;

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

		return (
			<MuiThemeProvider muiTheme={flybraryTheme}>
				<div className="App">
					<TopBar
						filterQuery={filterQuery}
						toggleMenu={this.toggleMenu}
						handleFilterChange={this.handleFilterChange}
						handleFilterClear={this.handleFilterClear}
					/>

					<SideBar
						menuVisible={this.state.menuVisible}
						handleClose={this.handleMenuClose}
						handleSetVisible={this.handleSetMenuVisible}
					/>

					<Route exact path="/" render={() => <Landing />} />

					<Route
						exact
						path="/shelves"
						render={() =>
							<Shelves
								books={books}
								shelves={shelves}
								filterQuery={filterQuery}
								clearQuery={this.handleFilterClear}
								handleShelfUpdate={this.handleShelfUpdate}
								findShelf={this.findShelf}
							/>}
					/>

					<Route
						exact
						path="/search"
						render={() =>
							<Search
								handleShelfUpdate={this.handleShelfUpdate}
								findShelf={this.findShelf}
							/>}
					/>

					<Snackbar
						open={this.state.snackbarOpen}
						message={
							snackbarData.shelf
								? `${snackbarData.title} added to shelf ${shelfText[
										snackbarData.shelf
									].wide}!`
								: ''
						}
						autoHideDuration={2000}
						onRequestClose={this.handleRequestClose}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
