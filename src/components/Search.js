// @flow

import React, { Component } from 'react';
import { snapshot } from 'react-snapshot';
import styled from 'styled-components';

import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import BookList from './BookList';

import { search } from '../utils/BooksAPI';
import type { BookType } from '../common/flowTypes';
import searchTerms from '../common/searchTerms';

const SearchContainer = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;
	overflow: hidden;
`;

// Can't do these easily with styled-components due to specialized style props
const styles = {
	searchIcon: {
		position: 'absolute',
		left: 10,
		top: 15,
		fontSize: '40px'
	},
	searchField: {
		width: '100%',
		textIndent: '60px',
		fontSize: '20px',
		height: '70px'
	},
	searchFieldWide: {
		width: '100%',
		textIndent: '60px',
		fontSize: '30px',
		height: '70px'
	},
	hint: { paddingBottom: '10px' }
};

class Search extends Component {
	props: {
		handleShelfUpdate: (BookType, string) => void,
		findShelf: string => string
	};

	state = {
		searchResults: [],
		snackbarOpen: false,
		dialogOpen: false
	};

	onSearch = (query: string) => {
		if (searchTerms.includes(query)) {
			snapshot(() => search(query, 10)).then(searchResults => {
				this.setState({
					searchResults
				});
			});
		} else {
			this.handleBadSearch();
		}
	};

	handleBadSearch = () => {
		this.setState({ snackbarOpen: true });
	};

	handleRequestClose = () => {
		this.setState({ snackbarOpen: false });
	};

	handleOpenDialog = () => {
		this.setState({ dialogOpen: true });
	};

	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};

	render() {
		return (
			<div className="search">
				<SearchContainer>
					<FontIcon className="material-icons" style={styles.searchIcon}>
						search
					</FontIcon>

					<AutoComplete
						hintText="Search by title or author"
						filter={AutoComplete.fuzzyFilter}
						dataSource={searchTerms}
						textFieldStyle={
							this.props.width === LARGE
								? styles.searchFieldWide
								: styles.searchField
						}
						hintStyle={styles.hint}
						fullWidth={true}
						maxSearchResults={5}
						onNewRequest={(req, idx) => this.onSearch(req)}
					/>
				</SearchContainer>

				<BookList
					books={this.state.searchResults}
					handleShelfUpdate={this.props.handleShelfUpdate}
					findShelf={this.props.findShelf}
				/>

				<Snackbar
					open={this.state.snackbarOpen}
					message={"That search term isn't permitted."}
					action="see why"
					autoHideDuration={3000}
					onRequestClose={this.handleRequestClose}
					onActionTouchTap={this.handleOpenDialog}
				/>

				<Dialog
					title="Why can't I search?"
					actions={
						<FlatButton
							label="OK"
							primary={true}
							onClick={this.handleCloseDialog}
						/>
					}
					modal={false}
					open={this.state.dialogOpen}
					onRequestClose={this.handleCloseDialog}
					autoScrollBodyContent={true}
				>
					<p>
						Due to some unfortunate limitations of the app's backend, only
						certain search terms return any results. Here's a list of the
						allowed terms:
					</p>
					{searchTerms.join(', ')}
				</Dialog>
			</div>
		);
	}
}

export default withWidth()(Search);
