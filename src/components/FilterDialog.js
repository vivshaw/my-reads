import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends React.Component {
	props: {
		open: boolean,
		handleFilterClear: () => void,
		handleFilterChange: (query: string) => void
	};

	state = {
		filterOpen: false,
		filterQuery: ''
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.open !== this.state.filterOpen) {
			this.setState({ filterOpen: nextProps.open });
		}
	}

	clear = () => {
		this.props.handleFilterClear();
		this.props.toggleDialog();
	};

	filter = () => {
		this.props.handleFilterChange(this.state.filterQuery);
		this.props.toggleDialog();
	};

	handleChange = event => {
		this.setState({
			filterQuery: event.target.value
		});
	};

	render() {
		const actions = [
			<FlatButton label="Clear" primary={true} onTouchTap={this.clear} />,
			<FlatButton label="Filter" primary={true} onTouchTap={this.filter} />
		];

		return (
			<div>
				<Dialog
					key="filter-dialog-id"
					title="Filter books"
					actions={actions}
					modal={true}
					open={this.state.filterOpen}
				>
					Filter your books by title & subtitle.
					<TextField
						id="filter-field-controlled"
						hintText="Filter by term"
						value={this.state.filterQuery}
						onChange={this.handleChange}
					/>
				</Dialog>
			</div>
		);
	}
}
