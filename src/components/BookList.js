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
          key={book.id}
          title={book.title}
          subtitle={book.subtitle}
          description={book.description}
          authors={book.authors}
          coverImageUrl={book.imageLinks.thumbnail}
        />
      )
    })
    if(this.state.books) {
      return (
        <div className="BookList">
          <Card.Group>{Books}</Card.Group>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default BookList;
