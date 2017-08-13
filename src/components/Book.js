// @flow

import React, { Component } from 'react';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

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

	onChange = (event, data) => {
		console.log(data.value);
		update(this.props.book, data.value).then(console.log('updated shelf!'));
	};

	render() {
		const shelfOptions = [
			{ key: 'Read', text: 'Read', value: 'read' },
			{
				key: 'Currently Reading',
				text: 'Currently Reading',
				value: 'currentlyReading'
			},
			{
				key: 'Want To Read',
				text: 'Want To Read',
				value: 'wantToRead'
			}
		];
		const { title, subtitle, description, authors, coverImageUrl } = this.props;
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
			</Card>
		);
	}
}

export default Book;
