import React from 'react';
import { shallow } from 'enzyme';

import { Tabs } from 'material-ui/Tabs';

import Home from '../Home';
import Shelf from '../Shelf';
import { testBooks } from '../../common/__tests__/testData';

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
				handleShelfUpdate={clearQuery}
				findShelf={clearQuery}
			/>
		);
	});

	it('renders shelf tabs', () => {
		expect(wrapper.find('div').length).toBe(1);
	});
});
