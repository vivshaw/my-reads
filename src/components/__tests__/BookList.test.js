import React from 'react';
import { shallow } from 'enzyme';

import BookList from '../BookList';
import Book from '../Book';
import { testBooks } from '../../common/testData';

describe('BookList', () => {
	let books, wrapper;

	beforeAll(() => {
		books = testBooks.books;
	});

	beforeEach(() => {
		wrapper = shallow(<BookList books={books} />);
	});

	it('should render a single book-list div', () => {
		expect(wrapper.find('.book-list').length).toBe(1);
	});

	it('should render each book', () => {
		expect(wrapper.find(Book).length).toBe(books.length);
	});
});
