// @flow

import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const Book = (props: {
	title: string,
	subtitle?: string,
	description: string,
	authors: Array<string>,
	coverImageUrl: string
}) => {
	return (
		<Card>
			<Card.Content>
				<Image floated="right" size="mini" src={props.coverImageUrl} />
				<Card.Header>
					{props.title}
				</Card.Header>
				{props.subtitle &&
					<Card.Meta>
						{props.subtitle}
					</Card.Meta>}
				{/* FIXME: show No description message when description is empty */}
				{props.description &&
					<Card.Description>
						{props.description.substring(0, 140) + '...'}
					</Card.Description>}
			</Card.Content>
			{/* FIXME: show no author message */}
			{props.authors &&
				<Card.Content extra>
					{props.authors.join(', ')}
				</Card.Content>}
		</Card>
	);
};

export default Book;
