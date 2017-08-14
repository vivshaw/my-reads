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
		title: string,
		subtitle?: string,
		description: string,
		authors: Array<string>,
		coverImageUrl: string,
		book: BookType
	};

	state = {
		shelf: ''
	};

	handleChangeShelf = (event, index, shelf) => {
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
			title,
			subtitle,
			description,
			authors,
			coverImageUrl,
			book
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
				<MenuItem value={shelfOption.value} primaryText={shelfOption.text} />
			);
		});

		return (
			<Card style={bookStyle} className="book">
				<CardMedia
					overlay={<CardTitle title={title} subtitle={subtitle} />}
					style={{ maxHeight: '400px', overflow: 'hidden' }}
				>
					<img src={coverImageUrl} alt={title} />
				</CardMedia>
				{authors && <CardTitle subtitle={authors.join(', ')} />}
				{description &&
					<CardText>
						{description.substring(0, 140) + '...'}
					</CardText>}
				<CardActions>
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
