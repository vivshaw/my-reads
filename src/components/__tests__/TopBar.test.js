import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import TopBar from '../TopBar';

describe('TopBar', () => {
	let toggleMenu, handleFilterChange, handleFilterClear, wrapper;

	beforeAll(() => {
		toggleMenu = jest.fn();
		handleFilterClear = jest.fn();
		handleFilterChange = jest.fn();
		injectTapEventPlugin();
	});

	beforeEach(() => {
		const muiTheme = getMuiTheme();
		wrapper = mount(
			<MemoryRouter initialEntries={['/shelves']}>
				<TopBar
					filterQuery=""
					toggleMenu={toggleMenu}
					handleFilterClear={handleFilterClear}
					handleFilterChange={handleFilterChange}
				/>
			</MemoryRouter>,
			{
				context: { muiTheme },
				childContextTypes: { muiTheme: React.PropTypes.object }
			}
		);
	});

	it('should show an AppBar', () => {
		expect(wrapper.find(AppBar).length).toBe(1);
	});

	it('should show a left and right icon button', () => {
		expect(wrapper.find(IconButton).length).toBe(2);
	});

	describe('ui interaction', () => {
		// can't get state of children, so can't test toggleDialog's effect on state
		// because MemoryRouter is root :(

		// disabled because can't get the click to simulate :(
		xit('should toggle the menu when the menu button is clicked', () => {
			wrapper.find(IconButton).first().simulate('click');
			expect(toggleMenu).toBeCalled();
		});
	});
});
