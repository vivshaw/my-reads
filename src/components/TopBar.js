// @flow

// Vendor
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Material-UI components
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";

// Components
import FilterDialog from "./FilterDialog";

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

const styles = {
  appBar: { boxShadow: "none" },
};

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
  handleFilterChange: (query: string) => void,
  handleFilterClear: () => void,
  toggleMenu: () => void,
};

/**
 * TopBar component
 * @param {function(string)} handleFilterChange from {@link App#handleFilterChange}
 * @param {function()} handleFilterClear from {@link App#handleFilterClear}
 * @param {function()} toggleMenu from {@link App#toggleMenu}
 */
class TopBar extends Component {
  props: Props;

  state = {
    dialogOpen: false,
  };

  /** Toggles the filter dialog open and closed. */
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
          render={() => (
            <AppBar
              title=""
              style={styles.appBar}
              iconElementRight={
                <IconButton
                  iconClassName="material-icons"
                  component="a"
                  title="GitHub"
                  href="https://github.com/vivshaw/my-reads"
                >
                  code
                </IconButton>
              }
              onLeftIconButtonTouchTap={toggleMenu}
            />
          )}
        />

        <Route
          exact
          path="/shelves"
          render={() => (
            <AppBar
              title="Shelves"
              style={styles.appBar}
              iconElementRight={
                <IconButton iconClassName="material-icons">
                  filter_list
                </IconButton>
              }
              onRightIconButtonTouchTap={this.toggleDialog}
              onLeftIconButtonTouchTap={toggleMenu}
            />
          )}
        />

        <Route
          exact
          path="/search"
          render={({ history }) => (
            <AppBar
              title="Search"
              style={styles.appBar}
              iconElementLeft={
                <IconButton iconClassName="material-icons">
                  arrow_back
                </IconButton>
              }
              onLeftIconButtonTouchTap={() => {
                history.goBack();
              }}
            />
          )}
        />

        <Route
          exact
          path="/move"
          render={() => (
            <AppBar
              title="Move"
              style={styles.appBar}
              onLeftIconButtonTouchTap={toggleMenu}
            />
          )}
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
