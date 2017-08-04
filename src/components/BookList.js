import React, { Component } from 'react';
import { Button, Card, Dimmer, Loader, Segment } from 'semantic-ui-react';
import escapeRegExp from "escape-string-regexp";

import Book from './Book';


class BookList extends Component {
  render() {
    const { books } = this.props;

    const FilteredBookElements = this.props.books.map((book) => {
      return (
        <Book
          key={book.id}
          title={book.title}
          subtitle={book.subtitle}
          description={book.description}
          authors={book.authors}
          coverImageUrl={book.imageLinks.thumbnail}
        />
      )
    })

    if(books) {
      return (
          <Card.Group>{FilteredBookElements}</Card.Group>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

export default BookList;
