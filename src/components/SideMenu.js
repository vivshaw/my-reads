// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

const SideMenu = (props: { menuVisible: boolean }) => {
	const { menuVisible } = props;

	return (
		<Sidebar
			width="thin"
			as={Menu}
			animation="uncover"
			visible={menuVisible}
			icon="labeled"
			vertical
			inverted
		>
			<Link to="/">
				<Menu.Item>
					<Icon name="home" />Home
				</Menu.Item>
			</Link>
			<Link to="/search">
				<Menu.Item>
					<Icon name="search" />Search
				</Menu.Item>
			</Link>
		</Sidebar>
	);
};

export default SideMenu;
