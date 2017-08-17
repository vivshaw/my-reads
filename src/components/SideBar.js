// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const SideMenu = (props: {
	menuVisible: boolean,
	handleClose: () => void,
	handleSetVisible: boolean => void
}) => {
	const { menuVisible, handleClose, handleSetVisible } = props;

	return (
		<Drawer
			className="side-bar"
			docked={false}
			width={200}
			open={menuVisible}
			onRequestChange={menuVisible => handleSetVisible(menuVisible)}
		>
			<AppBar
				className="side-bar-head"
				title="Flybrary"
				showMenuIconButton={false}
			/>

			<MenuItem
				className="side-bar-link"
				onTouchTap={handleClose}
				containerElement={<Link to="/" />}
			>
				Home
			</MenuItem>

			<MenuItem
				className="side-bar-link"
				onTouchTap={handleClose}
				containerElement={<Link to="/shelves" />}
			>
				Shelves
			</MenuItem>

			<MenuItem
				className="side-bar-link"
				onTouchTap={handleClose}
				containerElement={<Link to="/search" />}
			>
				Search
			</MenuItem>
		</Drawer>
	);
};

export default SideMenu;
