import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import SideMenu from '../SideMenu';

describe('SideMenu', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = mount(
			<MemoryRouter>
				<SideMenu menuVisible={false} />
			</MemoryRouter>
		);
	});

	it('renders a toggleable Sidebar', () => {
		expect(wrapper.find(Sidebar).length).toBe(1);
	});
});
