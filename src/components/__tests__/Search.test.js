import React from 'react';
import { shallow, mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Search from '../Search';

import { testBooks, jsonHeaders } from '../../common/testData';

describe('Home', () => {
	let books, findShelf, handleShelfUpdate, mounted, wrapper, search;

	beforeAll(() => {
		injectTapEventPlugin();
	});

	beforeEach(() => {
		const muiTheme = getMuiTheme();

		wrapper = shallow(
			<Search findShelf={findShelf} handleShelfUpdate={handleShelfUpdate} />
		);

		mounted = mount(
			<Search findShelf={findShelf} handleShelfUpdate={handleShelfUpdate} />,
			{
				context: { muiTheme },
				childContextTypes: { muiTheme: React.PropTypes.object }
			}
		);
	});

	it('should render a search page', () => {
		expect(wrapper.find('.search-page').length).toBe(1);
	});

	it('can search for a valid search term', done => {
		fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

		mounted.instance().onSearch('Biography');

		// this hacky bit is necessary to make Jest wait until the setState actually
		// happens before testing.
		setImmediate(() => {
			expect(mounted.state('searchResults')).toEqual(testBooks.books);
			expect(mounted.state('snackbarOpen')).toBe(false);
			done();
		});
	});

	it("won't search for an invalid search term", done => {
		fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

		mounted.instance().onSearch('Aeiou');

		// this hacky bit is necessary to make Jest wait until the setState actually
		// happens before testing.
		setImmediate(() => {
			expect(mounted.state('searchResults')).toEqual([]);
			expect(mounted.state('snackbarOpen')).toBe(true);
			done();
		});
	});

	it('opens the snackbar on bad search', () => {
		mounted.instance().handleBadSearch();
		expect(mounted.state('snackbarOpen')).toBe(true);
	});

	it('closes the snackbar', () => {
		mounted.instance().handleBadSearch();
		expect(mounted.state('snackbarOpen')).toBe(true);
		mounted.instance().handleRequestClose();
		expect(mounted.state('snackbarOpen')).toBe(false);
	});

	it('opens the dialog', () => {
		mounted.instance().handleOpenDialog();
		expect(mounted.state('dialogOpen')).toBe(true);
	});

	it('closes the dialog', () => {
		mounted.instance().handleOpenDialog();
		expect(mounted.state('dialogOpen')).toBe(true);
		mounted.instance().handleCloseDialog();
		expect(mounted.state('dialogOpen')).toBe(false);
	});
});
