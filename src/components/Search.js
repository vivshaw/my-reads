// @flow

// Vendor
import React, { Component } from 'react';
import styled from 'styled-components';

// Material-UI components
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

// Components
import BookList from './BookList';

// Utils/Common
import { search } from '../utils/BooksAPI';
import getWidth, { widths } from '../utils/getWidth';
import type { BookType } from '../common/flowTypes';
import { searchTerms } from '../common/commonData';

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/** A container to hide overflow of the AutoComplete component */
const SearchContainer = styled.div`
	display: inline-block;
	overflow: hidden;
	position: relative;
	width: 100%;
`;

// Can't do these easily with styled-components due to specialized style props
// in Material-UI AutoComplete
const styles = {
	chip: {
		margin: 4
	},
	hint: { paddingBottom: '10px' },
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
	searchIcon: {
		position: 'absolute',
		left: 10,
		top: 15,
		fontSize: '40px'
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap'
	}
};

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
	findShelf: string => string,
	handleShelfUpdate: (BookType, string) => void
};

/**
 * Search page component, located at route /search
 * @param {function(string)} findShelf	from {@link App#findShelf}
 * @param {function(BookType, string)} handleShelfUpdate   from {@link App#handleShelfUpdate}
 */
class Search extends Component {
	props: Props;

	state = {
		searchResults: [],
		snackbarOpen: false,
		dialogOpen: false
	};

	/**
	 * Executes a search via calling the BooksAPI search. If the search term is invalid,
	 * alert the user.
	 * @param  {string} query the query to search for
	 */
	onSearch = (query: string) => {
		if (searchTerms.includes(query)) {
			search(query, 10).then(searchResults => {
				this.setState({
					searchResults
				});
			});
		} else {
			this.handleBadSearch();
		}
	};

	/** Displays a Snackbar warning about disallowed search terms */
	handleBadSearch = () => {
		this.setState({ snackbarOpen: true });
	};

	/** Closes the Snackbar */
	handleRequestClose = () => {
		this.setState({ snackbarOpen: false });
	};

	/** Opens the search terms dialog */
	handleOpenDialog = () => {
		this.setState({ dialogOpen: true });
	};

	/** Closes the search terms dialog */
	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};

	render() {
		// Put each term in a fancy Chip
		const termChips = searchTerms.map(term =>
			<Chip key={term + '-chip'} style={styles.chip}>
				{term}
			</Chip>
		);

		return (
			<div className="search">
				<SearchContainer className="search-page">
					<FontIcon className="material-icons" style={styles.searchIcon}>
						search
					</FontIcon>

					<AutoComplete
						hintText="Search by title or author"
						filter={AutoComplete.fuzzyFilter}
						dataSource={searchTerms}
						textFieldStyle={
							getWidth() === widths.large
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
					message={'Search term not permitted.'}
					action="why?"
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
					<div style={styles.wrapper}>
						{termChips}
					</div>
				</Dialog>
			</div>
		);
	}
}

export default Search;
