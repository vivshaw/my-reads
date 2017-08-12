// @flow

import React, { Component } from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TopBar from './TopBar.js';
import SideMenu from './SideMenu';
import Home from './Home';
import Search from './Search';

import { getAll } from '../utils/BooksAPI';
import type { BookType } from '../common/flowTypes';

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
			<MuiThemeProvider>
				<div className="App">
					<TopBar
						filterQuery={this.state.filterQuery}
						toggleMenu={this.toggleMenu}
						updateQuery={this.updateQuery}
					/>

					<Sidebar.Pushable as={Segment} attached="bottom">
						<SideMenu menuVisible={this.state.menuVisible} />

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
					</Sidebar.Pushable>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
