// @flow

import React from 'react';
import { Icon, Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TopBar = (props: {
	filterQuery: string,
	toggleMenu: () => void,
	updateQuery: (query: string) => void
}) => {
	return (
		<Menu secondary attached="top">
			<Menu.Item onClick={() => props.toggleMenu()}>
				<Icon name="sidebar" />
			</Menu.Item>
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
			<Menu.Item position="right">
				<Input
					icon="filter"
					placeholder="Filter books..."
					value={props.filterQuery}
					onChange={event => props.updateQuery(event.target.value)}
				/>
			</Menu.Item>
		</Menu>
	);
};

export default TopBar;
