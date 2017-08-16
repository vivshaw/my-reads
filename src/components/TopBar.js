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
							title=""
							style={{ boxShadow: 'none' }}
							iconElementRight={
								<IconButton iconClassName="material-icons">code</IconButton>
							}
							onLeftIconButtonTouchTap={toggleMenu}
						/>}
				/>

				<Route
					exact
					path="/shelves"
					render={() =>
						<AppBar
							title="Shelves"
							style={{ boxShadow: 'none' }}
							iconElementRight={
								<IconButton iconClassName="material-icons">
									filter_list
								</IconButton>
							}
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
							style={{ boxShadow: 'none' }}
							iconElementLeft={
								<IconButton iconClassName="material-icons">
									arrow_back
								</IconButton>
							}
							onLeftIconButtonTouchTap={() => {
								history.push('/shelves');
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
