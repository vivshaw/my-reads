import Book from '../Book'
import { testBooks } from '../../testData'

import React from 'react';
import { shallow, render } from 'enzyme';
import { Image } from 'semantic-ui-react'

describe('Book', () => {
  let book, wrapper, rendered;

  beforeEach(() => {
    book = testBooks.books[0];
    wrapper = shallow(
      <Book
        key={book.id}
        title={book.title}
        subtitle={book.subtitle}
        description={book.description}
        authors={book.authors}
        coverImageUrl={book.imageLinks.thumbnail}
      />
    )
    rendered = render(
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

  it('should show the book\'s cover', () => {
    expect(wrapper.containsMatchingElement(<Image src={book.imageLinks.thumbnail} />)).toBe(true)
  })

  it('should show the book\'s title', () => {
    expect(rendered.text().includes(book.title)).toBe(true)
  })

  it('should show the book\'s subtitle', () => {
    expect(rendered.text().includes(book.subtitle)).toBe(true)
  })

  it('should show all the book\'s authors', () => {
    book.authors.forEach((author) => {
      expect(rendered.text().includes(author)).toBe(true)
    })
  })

  it('should show the book\'s description', () => {
    expect(rendered.text().includes(book.description.substring(0, 140))).toBe(true)
  })
})
