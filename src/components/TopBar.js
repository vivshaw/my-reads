// @flow

import React from 'react';
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

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
						onLeftIconButtonTouchTap={props.toggleMenu}
					/>}
			/>

			<Route
				exact
				path="/search"
				render={({ history }) =>
					<AppBar
						title="Search"
						iconElementRight={<FlatButton label="Filter" />}
						iconElementLeft={
							<IconButton iconClassName="material-icons" tooltip="Ligature">
								arrow_back
							</IconButton>
						}
						onLeftIconButtonTouchTap={() => {
							history.push('/');
						}}
					/>}
			/>
		</div>
	);
};

export default TopBar;
