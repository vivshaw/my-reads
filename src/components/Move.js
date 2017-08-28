// @flow

// Vendor
import React, { Component } from 'react';
import styled from 'styled-components';

// Material-UI components
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';

// Utils/Common
import { update } from '../utils/BooksAPI';

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/** A flexbox center-aligning div, to line up our table controls */
const Aligner = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
`;

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

/** Bulk move page component, located at route /move */
class Move extends Component {
	state = {
		selectedShelf: 'read',
		selected: []
	};

	/**
	 * Return whether or not a given row is selected
	 * @param  {number}  index 	index of the row we're checking
	 * @return {boolean}       	whether that row is selected
	 */
	isSelected = (index: number) => {
		return this.state.selected.indexOf(index) !== -1;
	};

	/**
	 * Controller for the Table component.
	 * @param  {Array<Number>} selectedRows  the rows the user has selected
	 */
	handleRowSelection = (selectedRows: Array<number>) => {
		this.setState({
			selected: selectedRows
		});
	};

	/**
	 * Controller for the DropDownMenu component.
	 * @param  {SyntheticEvent} event  					event emitted by component
	 * @param  {number} 				index         	index of selected menu item
	 * @param  {string} 				selectedShelf 	name of selected shelf
	 */
	handleSelectShelf = (
		event: SyntheticEvent,
		index: number,
		selectedShelf: string
	) => {
		this.setState({ selectedShelf });
	};

	/**
	 * Handles bulk movement. Finds the book corresponding to each index in selected,
	 * calls the BooksAPI shelf update on each with the shelf from newShelf, then updates
	 * app state with the handler from App#handleShelfUpdate
	 */
	handleChangeShelves = () => {
		const { books, handleShelfUpdate } = this.props;
		const { selectedShelf, selected } = this.state;
		const selectedBooks = selected.map(index => books[index]);
		const options = { isBulk: selectedBooks.length > 1 };

		selectedBooks.map(book =>
			update(book, selectedShelf).then(() =>
				handleShelfUpdate(book, selectedShelf, options)
			)
		);
	};

	render() {
		const { books } = this.props;
		const { selectedShelf } = this.state;

		const shelfOptions = [
			{ text: 'Read', value: 'read' },
			{
				text: 'Currently Reading',
				value: 'currentlyReading'
			},
			{
				text: 'Want To Read',
				value: 'wantToRead'
			}
		];

		// Map shelfOptions into dropdown menu items for table controls
		const shelfDropdownItems = shelfOptions.map(shelfOption => {
			return (
				<MenuItem
					key={shelfOption.value + '-opt'}
					value={shelfOption.value}
					primaryText={shelfOption.text}
				/>
			);
		});

		// Map books into table rows
		const bookRows = books.map((book, index) => {
			return (
				<TableRow key={book.id} selected={this.isSelected(index)}>
					<TableRowColumn>
						{book.title}
					</TableRowColumn>
					<TableRowColumn>
						{book.author}
					</TableRowColumn>
					<TableRowColumn>
						{book.shelf}
					</TableRowColumn>
					<TableRowColumn>
						{book.id}
					</TableRowColumn>
				</TableRow>
			);
		});

		return (
			<div>
				<Aligner>
					<span>Move books to:</span>
					<DropDownMenu value={selectedShelf} onChange={this.handleSelectShelf}>
						{shelfDropdownItems}
					</DropDownMenu>
					<RaisedButton
						label="Update Shelves"
						style={{ marginLeft: 'auto' }}
						primary={true}
						onClick={this.handleChangeShelves}
					/>
				</Aligner>
				<Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>Title</TableHeaderColumn>
							<TableHeaderColumn>Author</TableHeaderColumn>
							<TableHeaderColumn>Shelf</TableHeaderColumn>
							<TableHeaderColumn>ID</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody deselectOnClickaway={false}>
						{bookRows}
					</TableBody>
				</Table>
			</div>
		);
	}
}

export default Move;
