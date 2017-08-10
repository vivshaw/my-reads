// @flow

import React, { Component } from 'react';
import { Card, Dropdown, Icon, Image } from 'semantic-ui-react';
import { update } from '../utils/BooksAPI';
import type { BookType } from '../common/flowTypes';

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
			<Card>
				<Image floated="right" size="mini" src={coverImageUrl} />
				<Card.Content>
					<Card.Header>
						{title}
					</Card.Header>
					{subtitle &&
						<Card.Meta>
							{subtitle}
						</Card.Meta>}
					{/* FIXME: show No description message when description is empty */}
					{description &&
						<Card.Description>
							{description.substring(0, 140) + '...'}
						</Card.Description>}
				</Card.Content>
				{/* FIXME: show no author message */}
				{authors &&
					<Card.Content extra>
						{authors.join(', ')}
					</Card.Content>}
				<Card.Content extra color="red">
					<Dropdown
						placeholder="Add to a shelf?"
						defaultValue={this.props.book.shelf}
						fluid
						floating
						onChange={this.onChange}
						options={shelfOptions}
					/>
				</Card.Content>
			</Card>
		);
	}
}

export default Book;
