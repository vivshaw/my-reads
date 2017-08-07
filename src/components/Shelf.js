// @flow

import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import escapeRegExp from "escape-string-regexp";

import type { BookType } from '../common/flowTypes'
import BookList from './BookList';

const Shelf = (
  props: {
    title: string,
    books: Array<BookType>,
    filterQuery: string,
    clearQuery: () => void
  }) => {
  const { title, books, filterQuery, clearQuery } = props;
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
          name={title}
          active={false}
        />
        
        {books.length !== showingBooks.length && (
          <Menu.Menu position="right">
            <Menu.Item
              name='notifyShowing'
              active={false}
              icon="filter"
              content={`${showingBooks.length} of ${books.length}`}
            />
            <Menu.Item
              name='showAll'
              active={false}
              onClick={() => clearQuery()}
            />
          </Menu.Menu>
        )}
      </Menu>

      <BookList
        books={showingBooks}
      />
    </Segment>
  )
}

export default Shelf;
