import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home';
import Shelf from '../Shelf';
import { testBooks } from '../../common/testData';

describe('Home', () => {
	let books, clearQuery, filterQuery, shelves, wrapper;

	beforeAll(() => {
		books = testBooks.books;
		shelves = Array.from(new Set(books.map(book => book.shelf)));
		filterQuery = '';
		clearQuery = jest.fn();
		wrapper = shallow(
			<Home
				books={books}
				shelves={shelves}
				filterQuery={filterQuery}
				clearQuery={clearQuery}
			/>
		);
	});

	it('renders the correct number of shelves', () => {
		expect(wrapper.find(Shelf).length).toBe(2);
	});
});
