// @flow

// Vendor
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

// Material-UI
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { deepOrange200, brown50, darkWhite } from 'material-ui/styles/colors';

// Components
import TopBar from './TopBar';
import SideBar from './SideBar';

// Utils/Common
import { getAll, update } from '../utils/BooksAPI';
import type { BookType } from '../common/flowTypes';
import { shelfData } from '../common/commonData';

/* ------------------------------------------------------------------
   ------------------------ ASYNC COMPONENTS ------------------------
	 ------------------------------------------------------------------ */

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

const Move = Loadable({
	loader: () => import('./Move'),
	loading: () => null
});

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/* Material-UI theme */
const flybraryTheme = getMuiTheme({
	...lightBaseTheme,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: deepOrange200,
		primary2Color: brown50,
		primary3Color: darkWhite
	},
	appBar: {
		titleFontWeight: typography.fontWeightLight
	},
	card: {
		fontWeight: typography.fontWeightLight
	}
});

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

/** Main class for the Flybrary app */
class App extends Component {
	state = {
		books: [],
		filterQuery: '',
		menuVisible: false,
		snackbarOpen: false,
		snackbarData: { shelf: '', title: '' }
	};

	/**
	 * Toggles the SideBar's visibility.
	 */
	toggleMenu = () => {
		this.setState(state => ({ menuVisible: !state.menuVisible }));
	};

	/**
	 * Sets the SideBar's visibility.
	 * @param {boolean} menuVisible The desired visibility state
	 */
	handleSetMenuVisible = (menuVisible: boolean) => {
		this.setState({ menuVisible });
	};

	/**
	 * Closees the SideBar.
	 */
	handleMenuClose = () => this.setState({ menuVisible: false });

	/**
	 * Changes the filter query.
	 * @param  {string} query The term to filter by
	 */
	handleFilterChange = (query: string) => {
		this.setState({ filterQuery: query.trim() });
	};

	/**
	 * Clears the filter query.
	 */
	handleFilterClear = () => {
		this.setState({ filterQuery: '' });
	};

	/**
	 * Opens the snackbar for adding a book.
	 */
	handleSnackbarOpen = () => {
		this.setState({ snackbarOpen: true });
	};

	/**
	 * Closes the snackbar.
	 */
	handleRequestClose = () => {
		this.setState({ snackbarOpen: false });
	};

	/**
	 * Updates a book's shelf. If the book is already in our books, we simply call the API
	 * then change its shelf. Otherwise, we must add it to our books too.
	 * @param  {Book} targetBook 	 The book we wish to update
	 * @param  {String} shelf      The shelf we wish to update it to
	 * @param  {Object} [options]   optional options object. isBulk: if true, suppresses the snackbar notifications
	 */
	handleShelfUpdate = (
		targetBook: BookType,
		shelf: string,
		options: ?Object
	) => {
		update(targetBook, shelf).then(
			this.setState(({ books }) => {
				const targetBookIndex = books.findIndex(
					book => book.id === targetBook.id
				);

				// Add book to Books if it isn't there already
				if (targetBookIndex !== -1) {
					books[targetBookIndex].shelf = shelf;
				} else {
					books.push(Object.assign({}, targetBook, { shelf }));
				}

				return {
					books,
					snackbarData: { title: targetBook.title, shelf: shelf }
				};
			})
		);

		if (!options || (options && !options.isBulk)) {
			this.handleSnackbarOpen();
		}
	};

	/**
	 * Finds the shelf of a book by ID, returning an empty string if it has no shelf.
	 * @param  {string} id The id of the book we want to find the shelf of.
	 */
	findShelf = (id: string) => {
		const book = this.state.books.find(book => book.id === id);
		if (book) {
			return book.shelf;
		} else {
			return 'none';
		}
	};

	componentDidMount() {
		getAll().then((books: Array<BookType>) => {
			this.setState({ books });
		});

		Shelves.preload();
		Search.preload();
		Move.preload();
	}

	render() {
		const { books, filterQuery, snackbarData } = this.state;

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

					<Route
						exact
						path="/move"
						render={() =>
							<Move books={books} handleShelfUpdate={this.handleShelfUpdate} />}
					/>

					<Snackbar
						open={this.state.snackbarOpen}
						message={
							snackbarData.shelf
								? `${snackbarData.title} added to ${shelfData.getshelfWithWidth(
										snackbarData.shelf
									)}!`
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
