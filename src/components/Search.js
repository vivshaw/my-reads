// @flow

import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import BookList from './BookList';
import { search } from '../utils/BooksAPI';
import searchTerms from '../common/searchTerms';

const styles = {
	searchContainer: {
		position: 'relative',
		display: 'inline-block',
		width: '97%'
	},
	searchIcon: {
		position: 'absolute',
		left: 10,
		top: 15,
		width: 20,
		height: 20
	},
	searchField: { textIndent: 40 }
};

class Search extends Component {
	state = {
		searchTerm: '',
		searchResults: []
	};

	onSearch = (query: string) => {
		if (searchTerms.includes(query)) {
			search(query, 10).then(searchResults => {
				console.log(searchResults[0]);
				this.setState({
					searchResults
				});
			});
		}
	};

	handleChange = (searchTerm: string) => {
		this.setState({ searchTerm });
		this.onSearch(searchTerm);
	};

	render() {
		return (
			<div className="search">
				<div className="search-field" style={styles.searchContainer}>
					<FontIcon className="material-icons" style={styles.searchIcon}>
						search
					</FontIcon>

					<TextField
						id="text-field-controlled"
						value={this.state.searchTerm}
						style={styles.searchField}
						hintText="Search by title or author"
						onChange={event => this.handleChange(event.target.value)}
						fullWidth={true}
					/>
				</div>

				<BookList
					books={this.state.searchResults}
					handleShelfUpdate={this.props.handleShelfUpdate}
					findShelf={this.props.findShelf}
				/>
			</div>
		);
	}
}

export default Search;
