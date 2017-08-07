import React from 'react';
import { Icon, Input, Menu, MenuItem } from 'semantic-ui-react';
import { shallow } from 'enzyme';

import TopBar from '../TopBar';

describe('Book', () => {
	let toggleMenu, updateQuery, wrapper;

	beforeAll(() => {
		toggleMenu = jest.fn();
		updateQuery = jest.fn();
	});

	beforeEach(() => {
		wrapper = shallow(
			<TopBar
				filterQuery=""
				toggleMenu={toggleMenu}
				updateQuery={updateQuery}
			/>
		);
	});

	it('should show a menu', () => {
		expect(wrapper.find(Menu).length).toBe(1);
	});

	it('should show a menu button', () => {
		expect(wrapper.find(Icon).length).toBe(1);
	});

	it('should show a filter input', () => {
		expect(wrapper.find(Input).length).toBe(1);
	});

	describe('ui interaction', () => {
		it('should toggle the menu when the menu button is clicked', () => {
			wrapper.find(MenuItem).first().simulate('click');
			expect(toggleMenu).toBeCalled();
		});

		it('should update the filter with the correct value when changed', () => {
			const newQuery = 'test';
			wrapper.find(Input).simulate('change', { target: { value: newQuery } });
			expect(updateQuery).toBeCalledWith(newQuery);
		});
	});
});
