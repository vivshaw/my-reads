// @flow

import React from 'react';
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const TopBar = (props: {
	filterQuery: string,
	toggleMenu: () => void,
	handleFilterChange: (query: string) => void
}) => {
	return (
		<div>
			<Route
				exact
				path="/"
				render={() =>
					<AppBar
						title="Flybrary"
						iconElementRight={<FlatButton label="Filter" />}
						onLeftIconButtonTouchTap={props.toggleMenu}
					/>}
			/>

			<Route
				exact
				path="/shelves"
				render={() =>
					<AppBar
						title="Shelves"
						iconElementRight={<FlatButton label="Filter" />}
						onLeftIconButtonTouchTap={props.toggleMenu}
					/>}
			/>

			<Route
				exact
				path="/search"
				render={() =>
					<AppBar
						title="Search"
						iconElementRight={<FlatButton label="Filter" />}
						onLeftIconButtonTouchTap={props.toggleMenu}
					/>}
			/>
		</div>
	);
};

export default TopBar;
