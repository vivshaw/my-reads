// @flow

import React, { Component } from 'react';

import {
	Card,
	CardActions,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { update } from '../utils/BooksAPI';
import type { BookType } from '../common/flowTypes';

const bookStyle = {
	flexGrow: 1,
	flexShrink: 0,
	margin: '0 10px 12px',
	width: '90vw',
	minWidth: '300px',
	maxWidth: '400px'
};

class Book extends Component {
	props: {
		book: BookType,
		handleShelfUpdate: (string, string) => void,
		findShelf: string => string
	};

	state = {
		shelf: ''
	};

	handleChangeShelf = (event: SyntheticEvent, index: number, shelf: string) => {
		const { book, handleShelfUpdate } = this.props;
		update(book, shelf).then(() => {
			this.setState({ shelf });
			handleShelfUpdate(book.id, shelf);
		});
	};

	componentDidMount() {
		const { book, findShelf } = this.props;
		if (book.shelf) {
			this.setState({ shelf: book.shelf });
		} else {
			const shelf = findShelf(book.id);
			this.setState({ shelf });
		}
	}

	render() {
		const {
			book: { title, subtitle, description, authors, imageLinks: { thumbnail } }
		} = this.props;

		const shelfOptions = [
			{ text: 'Read', value: 'read' },
			{
				text: 'Currently Reading',
				value: 'currentlyReading'
			},
			{
				text: 'Want To Read',
				value: 'wantToRead'
			},
			{
				text: 'No Shelf',
				value: ''
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
			<Card style={bookStyle} className="book">
				<CardMedia
					overlay={<CardTitle title={title} subtitle={subtitle} />}
					style={{ maxHeight: '400px', overflow: 'hidden' }}
				>
					<img src={thumbnail} alt={title} />
				</CardMedia>
				{authors && <CardTitle subtitle={authors.join(', ')} />}
				{description &&
					<CardText>
						{description.substring(0, 140) + '...'}
					</CardText>}
				<CardActions>
					Shelf:
					<DropDownMenu
						value={this.state.shelf}
						onChange={this.handleChangeShelf}
					>
						{shelfDropdownItems}
					</DropDownMenu>
				</CardActions>
			</Card>
		);
	}
}

export default Book;
