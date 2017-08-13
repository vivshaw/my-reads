// @flow

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { deepOrange200, deepOrange400 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Home from './Home';
import Search from './Search';
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

	handleSetVisible = (menuVisible: boolean) => {
		this.setState({ menuVisible });
	};

	handleClose = () => this.setState({ menuVisible: false });

	updateQuery = (query: string) => {
		this.setState({ filterQuery: query.trim() });
	};

	clearQuery = () => {
		this.setState({ filterQuery: '' });
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
					<AppBar
						title="flybrary"
						iconElementRight={<FlatButton label="Filter" />}
						onLeftIconButtonTouchTap={this.toggleMenu}
					/>

					<SideBar
						menuVisible={this.state.menuVisible}
						handleClose={this.handleClose}
						handleSetVisible={this.handleSetVisible}
					/>

					<Route
						exact
						path="/"
						render={() =>
							<Home
								books={books}
								shelves={shelves}
								filterQuery={filterQuery}
								clearQuery={this.clearQuery}
							/>}
					/>
					<Route exact path="/search" render={() => <Search />} />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
