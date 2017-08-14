// @flow

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { deepOrange200, deepOrange400 } from 'material-ui/styles/colors';

import Home from './Home';
import Search from './Search';
import TopBar from './TopBar';
import SideBar from './SideBar';

import { getAll } from '../utils/BooksAPI';
import type { BookType } from '../common/flowTypes';

const flybraryTheme = getMuiTheme({
	...lightBaseTheme,
	palette: {
		primary1Color: deepOrange200,
		pickerHeaderColor: deepOrange200,
		primary2Color: deepOrange400
	}
});

class App extends Component {
	state = {
		books: [],
		filterQuery: '',
		menuVisible: false,
		shelves: []
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

	handleShelfUpdate = (id: string, shelf: string) => {
		console.log(`updating book ${id} to ${shelf}`);
		this.setState(({ books }) => {
			const targetBookIndex = books.findIndex(book => book.id === id);
			console.log(`book index: ${targetBookIndex}`);
			if (targetBookIndex !== -1) {
				console.log('book found!');
				books[targetBookIndex].shelf = shelf;
			}
			return books;
		});
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
		getAll().then((books: Array<BookType>) => {
			const shelves = Array.from(new Set(books.map(book => book.shelf)));
			this.setState({
				books,
				shelves
			});
		});
	}

	render() {
		const { filterQuery, shelves, books } = this.state;

		return (
			<MuiThemeProvider muiTheme={flybraryTheme}>
				<div className="App">
					<TopBar
						filterQuery={filterQuery}
						toggleMenu={this.toggleMenu}
						handleFilterChange={this.handleFilterChange}
					/>

					<SideBar
						menuVisible={this.state.menuVisible}
						handleClose={this.handleMenuClose}
						handleSetVisible={this.handleSetMenuVisible}
					/>

					<Route
						exact
						path="/shelves"
						render={() =>
							<Home
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
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
