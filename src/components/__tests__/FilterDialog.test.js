import React from 'react';
import Dialog from 'material-ui/Drawer';
import { shallow, mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import FilterDialog from '../FilterDialog';

describe('FilterDialog', () => {
	let mounted, handleFilterChange, handleFilterClear, toggleDialog;

	beforeAll(() => {
		handleFilterChange = jest.fn();
		handleFilterClear = jest.fn();
		toggleDialog = jest.fn();
		injectTapEventPlugin();
	});

	beforeEach(() => {
		const muiTheme = getMuiTheme();

		mounted = mount(
			<FilterDialog
				handleFilterChange={handleFilterChange}
				handleFilterClear={handleFilterClear}
				open={true}
				toggleDialog={toggleDialog}
			/>,
			{
				context: { muiTheme },
				childContextTypes: { muiTheme: React.PropTypes.object }
			}
		);
	});

	it('renders a Dialog', () => {
		// Enzyme can only find the Dialog by display name?
		expect(mounted.find('Dialog').length).toBe(1);
	});

	describe('ui interaction', () => {
		it('can clear the query', () => {
			mounted.instance().clear();
			expect(handleFilterClear).toHaveBeenCalled();
		});

		it('can apply the filter', () => {
			mounted.instance().filter();
			expect(handleFilterChange).toHaveBeenCalled();
		});

		it('clearing and filtering both close the dialog', () => {
			mounted.instance().filter();
			expect(toggleDialog).toHaveBeenCalled();
			mounted.instance().clear();
			expect(toggleDialog).toHaveBeenCalled();
		});

		it('sets the query', () => {
			const query = 'term';
			mounted.instance().handleChange({ target: { value: query } });
			expect(mounted.state('filterQuery')).toBe(query);
		});
	});
});
