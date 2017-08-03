import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const Book = (props) => {
  return (
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src={props.coverImageUrl} />
        <Card.Header>
          {props.title}
        </Card.Header>
        {props.subtitle &&
          <Card.Meta>
            {props.subtitle}
          </Card.Meta>
        }
        <Card.Description>
          {props.description.substring(0, 140) + "..."}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {props.authors.join(', ')}
      </Card.Content>
    </Card>
)}

export default Book;
