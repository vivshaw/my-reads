import React from 'react';
import { shallow, mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Home from '../Home';

import { testBooks } from '../../common/testData';

describe('Home', () => {
	let books, clearQuery, filterQuery, mounted, shelves, wrapper;

	beforeAll(() => {
		books = testBooks.books;
		shelves = Array.from(new Set(books.map(book => book.shelf)));
		filterQuery = '';
		clearQuery = jest.fn();

		injectTapEventPlugin();
		const muiTheme = getMuiTheme();

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

		mounted = mount(
			<Home
				books={books}
				shelves={shelves}
				filterQuery={filterQuery}
				clearQuery={clearQuery}
				handleShelfUpdate={clearQuery}
				findShelf={clearQuery}
			/>,
			{
				context: { muiTheme },
				childContextTypes: { muiTheme: React.PropTypes.object }
			}
		);
	});

	it('renders shelf tabs', () => {
		expect(wrapper.find('div').length).toBe(1);
	});

	it('changes tabs', () => {
		expect(mounted.state('slideIndex')).toBe(0);
		mounted.instance().handleTabChange(1);
		expect(mounted.state('slideIndex')).toBe(1);
	});
});
