// @flow

// Vendor
import React from 'react';
import { Link } from 'react-router-dom';

// Material-UI components
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
	handleClose: () => void,
	handleSetVisible: boolean => void,
	menuVisible: boolean
};

/**
 * SideMenu drawer component.
 * @param {function()} handleClose from {@link App#handleClose}
 * @param {function(boolean)} handleSetVisible from {@link App#handleSetVisible}
 * @param {boolean} menuVisible 			whether the menu is visible
 */
const SideBar = (props: Props) => {
	const { menuVisible, handleClose, handleSetVisible } = props;

	return (
		<Drawer
			className="side-bar"
			docked={false}
			width={200}
			open={menuVisible}
			onRequestChange={handleSetVisible}
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

			<MenuItem
				className="side-bar-link"
				onTouchTap={handleClose}
				containerElement={<Link to="/move" />}
			>
				Move
			</MenuItem>
		</Drawer>
	);
};

export default SideBar;
