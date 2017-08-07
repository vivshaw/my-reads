import Shelf from '../Shelf'
import BookList from '../BookList'
import Book from '../Book'
import { testBooks } from '../../testData'

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Menu, MenuItem, MenuMenu } from 'semantic-ui-react'
import escapeRegExp from "escape-string-regexp";

describe('Shelf', () => {
  let books, shelf, shelvedBooks, wrapper;
  const shelveBooks = (books, shelf) => books.filter((book) => book.shelf === shelf);
  const clearQuery = jest.fn()

  beforeEach(() => {
    books = testBooks.books;
    shelf = "testShelf";
    shelvedBooks = shelveBooks(books, shelf);
    wrapper = shallow(
      <Shelf
        key={shelf+'-id'}
        title={shelf}
        books={shelvedBooks}
        filterQuery=""
        clearQuery={clearQuery}
      />
    )
  })

  it('should render a menu', () => {
    expect(wrapper.find(Menu).length).toBe(1)
  })

  it('should render a BookList', () => {
    expect(wrapper.find(BookList).length).toBe(1)
  })

  describe('filters books', () => {
    let expectedBooks, unfiltered, filtered;

    beforeEach(() => {
      expectedBooks = (books, query) => {
        const match = new RegExp(escapeRegExp(query), 'i')
        return books.filter((book) => {
          return match.test(book.title) || match.test(book.subtitle)
        })
      }

      filtered = mount(
        <Shelf
          key={shelf+'-id'}
          title={shelf}
          books={shelvedBooks}
          filterQuery="2"
          clearQuery={clearQuery}
        />
      )

      unfiltered = mount(
        <Shelf
          key={shelf+'-id'}
          title={shelf}
          books={shelvedBooks}
          filterQuery=""
          clearQuery={clearQuery}
        />
      )
    })

    it('only when filterQuery is not empty', () => {
      expect(unfiltered.find(Book).length).toBe(shelvedBooks.length)
    })

    it('showing only those that match filterQuery', () => {
      const filterQuery = "2"

      expect(filtered.find(Book).length).toBe(
        expectedBooks(shelvedBooks, filterQuery).length
      )
    })

    describe('filter ui', () => {
      it('shouldn\'t show filter ui unless filtered', () => {
        expect(unfiltered.find(MenuMenu).length).toBe(0)
      })

      it('should show a filter notification and button when filtered', () => {
        expect(filtered.find(MenuMenu).length).toBe(1)
      })

      it('should clear the query when the user clicks Show All', () => {
        const clearButton = filtered.find(MenuItem).last()
        clearButton.simulate('click')
        expect(clearQuery).toBeCalled()
      })
    })
  })
})
