import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import App from '../App';
import TopBar from '../TopBar';
import SideMenu from '../SideMenu';
import { testBooks, jsonHeaders } from '../../common/testData';

describe('App', () => {
	let wrapper, wrwrapperer;

	beforeAll(() => {
		fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
		wrapper = shallow(<App />);
	});

	it('renders without crashing', () => {
		fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

		const div = document.createElement('div');
		ReactDOM.render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
			div
		);
	});

	it('renders a TopBar', () => {
		expect(wrapper.find(TopBar).length).toBe(1);
	});

	it('renders a SideMenu', () => {
		expect(wrapper.find(SideMenu).length).toBe(1);
	});

	describe('ui interaction', () => {
		it('shows and hides the sidebar', () => {
			expect(wrapper.state('menuVisible')).toBe(false);
			wrapper.instance().toggleMenu();
			expect(wrapper.state('menuVisible')).toBe(true);
			wrapper.instance().toggleMenu();
			expect(wrapper.state('menuVisible')).toBe(false);
		});

		it('updates the query', () => {
			const testQuery = 'test';

			expect(wrapper.state('filterQuery')).toBe('');
			wrapper.instance().updateQuery(testQuery);
			expect(wrapper.state('filterQuery')).toBe(testQuery);
		});

		it('clears the query', () => {
			const testQuery = 'test';

			wrapper.instance().updateQuery(testQuery);
			expect(wrapper.state('filterQuery')).toBe(testQuery);
			wrapper.instance().clearQuery();
			expect(wrapper.state('filterQuery')).toBe('');
		});
	});
});
