// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

const SideMenu = (props: {
	menuVisible: boolean,
	handleClose: () => void,
	handleSetVisible: boolean => void
}) => {
	const { menuVisible, handleClose, handleSetVisible } = props;

	return (
		<Drawer
			docked={false}
			width={200}
			open={menuVisible}
			onRequestChange={menuVisible => handleSetVisible(menuVisible)}
		>
			<AppBar title="flybrary" showMenuIconButton={false} />

			<MenuItem onTouchTap={handleClose} containerElement={<Link to="/" />}>
				Shelves
			</MenuItem>

			<MenuItem
				onTouchTap={handleClose}
				containerElement={<Link to="/search" />}
			>
				Search
			</MenuItem>
		</Drawer>
	);
};

export default SideMenu;
