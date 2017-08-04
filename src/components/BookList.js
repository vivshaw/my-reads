import React, { Component } from 'react';
import { Button, Card, Segment } from 'semantic-ui-react';
import escapeRegExp from "escape-string-regexp";

import Book from './Book';


class BookList extends Component {
  render() {
    const { books, filterQuery, clearQuery } = this.props;
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

    if(books) {
      return (
        <div className="BookList">
          {books.length !== showingBooks.length && (
            <Segment basic>
              <Button
                basic
                onClick={() => clearQuery()}

                content='Show All'
                label={{
                  as: 'a',
                  basic: true,
                  
                  pointing: 'right',
                  content: `Now showing ${showingBooks.length} of ${books.length} total.`
                }}
                labelPosition='left'
              />
            </Segment>
          )}
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
