// @flow

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import FilterDialog from './FilterDialog';

class TopBar extends Component {
	props: {
		filterQuery: string,
		toggleMenu: () => void,
		handleFilterClear: () => void,
		handleFilterChange: (query: string) => void
	};

	state = {
		dialogOpen: false
	};

	toggleDialog = () => {
		this.setState(({ dialogOpen }) => {
			return { dialogOpen: !dialogOpen };
		});
	};

	render() {
		const { toggleMenu, handleFilterChange, handleFilterClear } = this.props;

		return (
			<div>
				<Route
					exact
					path="/"
					render={() =>
						<AppBar
							title="Flybrary"
							iconElementRight={<FlatButton label="github" />}
							onLeftIconButtonTouchTap={toggleMenu}
						/>}
				/>

				<Route
					exact
					path="/shelves"
					render={() =>
						<AppBar
							title="Shelves"
							iconElementRight={<FlatButton label="Filter" />}
							onRightIconButtonTouchTap={this.toggleDialog}
							onLeftIconButtonTouchTap={toggleMenu}
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

				<FilterDialog
					open={this.state.dialogOpen}
					toggleDialog={this.toggleDialog}
					handleFilterChange={handleFilterChange}
					handleFilterClear={handleFilterClear}
				/>
			</div>
		);
	}
}

export default TopBar;
