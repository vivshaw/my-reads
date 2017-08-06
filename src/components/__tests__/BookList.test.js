import BookList from '../BookList'
import Book from '../Book'
import { testBooks } from '../../testData'

import React from 'react';
import { shallow } from 'enzyme';
import { CardGroup } from 'semantic-ui-react'

describe('BookList', () => {
  let books, wrapper;

  beforeEach(() => {
    books = testBooks.books;
    wrapper = shallow(
      <BookList books={books}/>
    )
  })

  it('should render a single CardGroup', () => {
    expect(wrapper.find(CardGroup).length).toBe(1)
  })

  it('should render each book', () => {
    expect(wrapper.find(Book).length).toBe(books.length)
  })
})
