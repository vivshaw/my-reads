import React, { Component } from 'react';
import { Button, Menu, Segment } from 'semantic-ui-react';
import escapeRegExp from "escape-string-regexp";

import BookList from './BookList';

class Shelf extends Component {
  render() {
    const { books, filterQuery, clearQuery } = this.props;
    let showingBooks;

    if (filterQuery) {
      const match = new RegExp(escapeRegExp(filterQuery), 'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.subtitle))
    } else {
      showingBooks = books;
    }

    return (
      <Segment basic>
        <Menu>
          <Menu.Item
            name={this.props.title}
            active={false}
          />

          {books.length !== showingBooks.length && (
            <Menu.Item
              name='notifyShowing'
              active={false}
              content={`Now showing ${showingBooks.length} of ${books.length} total.`}
              position="right"
            />
          )}
          {books.length !== showingBooks.length && (
            <Menu.Item
              name='showAll'
              active={false}
              onClick={() => clearQuery()}
              position="right"
            />
          )}
        </Menu>

        <BookList
          books={showingBooks}
        />
      </Segment>
    )
  }
}

export default Shelf;
