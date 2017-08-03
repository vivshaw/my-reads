import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import Book from './Book';
import { getAll } from '../utils/BooksAPI';

class BookList extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    getAll().then(books => this.setState({ books }))
  }

  render() {
    const Books = this.state.books.map((book) => {
      return (
        <Book
          title={book.title}
          subtitle={book.subtitle}
          description={book.description}
          authors={book.authors}
          coverImageUrl={book.imageLinks.thumbnail}
        />
      )
    })

    return (
      <div className="BookList">
        <Card.Group>{Books}</Card.Group>
      </div>
    );
  }
}

export default BookList;
