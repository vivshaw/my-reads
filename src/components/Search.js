// @flow

import React, { Component } from 'react';
import { Button, Input, Segment, Sidebar } from 'semantic-ui-react';

import BookList from './BookList';
import { search } from '../utils/BooksAPI';
import searchTerms from '../common/searchTerms';

class Search extends Component {
	state = {
		searchTerm: '',
		searchResults: []
	};

	onSearch = (query: string) => {
		if (query === '') {
			// FIXME: toast user
			console.log('empty query!');
		} else if (!searchTerms.includes(query)) {
			// FIXME: toast user, show list of allowed terms?
			console.log('query not in allowed terms');
		} else {
			search(query, 10).then(searchResults => {
				this.setState({
					searchResults
				});
			});
		}
	};

	onChange = (searchTerm: string) => {
		this.setState({ searchTerm });
	};

	render() {
		return (
			<Sidebar.Pusher>
				<Segment basic>
					<Input
						icon="search"
						value={this.state.searchTerm}
						onChange={event => this.onChange(event.target.value)}
					/>
					<Button onClick={() => this.onSearch(this.state.searchTerm)}>
						Search
					</Button>
					<BookList books={this.state.searchResults} />
				</Segment>
			</Sidebar.Pusher>
		);
	}
}

export default Search;
