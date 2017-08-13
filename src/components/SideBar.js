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
			className="side-bar"
		>
			<AppBar
				title="Flybrary"
				showMenuIconButton={false}
				className="side-bar-head"
			/>

			<MenuItem
				onTouchTap={handleClose}
				containerElement={<Link to="/shelves" />}
				className="side-bar-link"
			>
				Shelves
			</MenuItem>

			<MenuItem
				onTouchTap={handleClose}
				containerElement={<Link to="/search" />}
				className="side-bar-link"
			>
				Search
			</MenuItem>
		</Drawer>
	);
};

export default SideMenu;
