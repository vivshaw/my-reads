// @flow

// Vendor
import React, { Component } from "react";

// Material-UI
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
  handleFilterChange: (query: string) => void,
  handleFilterClear: () => void,
  open: boolean,
  toggleDialog: () => void,
};

/**
 * Dialog for selecting a filter term to filter shelf display by title
 * @param {function(string)} handleFilterChange from {@link App#handleFilterChange}
 * @param {function()} handleFilterClear from {@link App#handleFilterClear}
 * @param {boolean} open whether the dialog is open
 * @param {function()} toggleDialog from {@link TopBar#toggleDialog}
 */
class FilterDialog extends Component {
  props: Props;

  state = {
    filterOpen: false,
    filterQuery: "",
  };

  /**
   * Clears the filter query
   */
  clear = () => {
    this.props.handleFilterClear();
    this.props.toggleDialog();
  };

  /**
   * Applies the filter
   */
  filter = () => {
    this.props.handleFilterChange(this.state.filterQuery);
    this.props.toggleDialog();
  };

  /**
   * Contoller for controlled component TextField
   * @param  {SyntheticEvent} event onChange event from TextField
   */
  handleChange = (event: SyntheticEvent) => {
    this.setState({
      filterQuery: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.open !== this.state.filterOpen) {
      this.setState({ filterOpen: nextProps.open });
    }
  }

  componentDidMount() {
    this.setState({ filterOpen: this.props.open });
  }

  render() {
    const actions = [
      <Button label="Clear" primary={true} onTouchTap={this.clear} />,
      <Button label="Filter" primary={true} onTouchTap={this.filter} />,
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
          <p>Filter your books by title & subtitle.</p>
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

export default FilterDialog;
