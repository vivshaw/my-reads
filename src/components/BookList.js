import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import escapeRegExp from "escape-string-regexp";

import Book from './Book';


class BookList extends Component {
  render() {
    const { books, filterQuery } = this.props;
    let showingBooks;

    if (filterQuery) {
      const match = new RegExp(escapeRegExp(filterQuery), 'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.subtitle))
    } else {
      showingBooks = books;
    }

    const FilteredBookElements = showingBooks.map((book) => {
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

    if(this.props.books) {
      return (
        <div className="BookList">
          <Card.Group>{FilteredBookElements}</Card.Group>
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
