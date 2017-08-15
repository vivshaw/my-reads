import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import { shallow } from 'enzyme';

import SideBar from '../SideBar';

describe('SideMenu', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<SideBar menuVisible={false} />);
	});

	it('renders a toggleable Drawer', () => {
		expect(wrapper.find(Drawer).length).toBe(1);
	});
});
