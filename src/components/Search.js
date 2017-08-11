// @flow

import React, { Component } from 'react';
import { Input, Segment, Sidebar, Transition } from 'semantic-ui-react';

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
		this.onSearch(searchTerm);
	};

	render() {
		return (
			<Transition.Group animation="slide right" duration={500}>
				<Sidebar.Pusher>
					<Segment>
						<Input
							fluid
							size="massive"
							icon="search"
							placeholder="Search by title or author"
							value={this.state.searchTerm}
							onChange={event => this.onChange(event.target.value)}
						/>
					</Segment>
					<Segment basic>
						<BookList books={this.state.searchResults} />
					</Segment>
				</Sidebar.Pusher>
			</Transition.Group>
		);
	}
}

export default Search;
