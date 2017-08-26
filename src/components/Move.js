import React, { Component } from 'react';

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

import { update } from '../utils/BooksAPI';

import styled from 'styled-components';

const Aligner = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
`;

class Move extends Component {
	state = {
		selectedShelf: 'read',
		selected: []
	};

	isSelected = (index: number) => {
		return this.state.selected.indexOf(index) !== -1;
	};

	handleRowSelection = (selectedRows: Array<number>) => {
		this.setState({
			selected: selectedRows
		});
	};

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

	handleSelectShelf = (
		event: SyntheticEvent,
		index: number,
		selectedShelf: string
	) => {
		this.setState({ selectedShelf });
	};

	render() {
		const { books } = this.props;
		const { selectedShelf } = this.state;

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

		const shelfDropdownItems = shelfOptions.map(shelfOption => {
			return (
				<MenuItem
					key={shelfOption.value + '-opt'}
					value={shelfOption.value}
					primaryText={shelfOption.text}
				/>
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
