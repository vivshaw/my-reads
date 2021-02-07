// @flow

// Vendor
import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";

// Material-UI components
import { Tab, Tabs } from "@material-ui/core";

// Components
import Shelf from "./Shelf";

// Utils/Common
import type { BookType } from "../common/flowTypes";
import { shelfData } from "../common/commonData";

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
  books: Array<BookType>,
  clearQuery: () => void,
  filterQuery: string,
  findShelf: (string) => string,
  handleShelfUpdate: (BookType, string) => void,
};

/**
 * Home page component, located at route /shelves
 * @param {Array<BookType>} books  the array of all Books the user has
 * @param {function()} clearQuery  from {@link App#clearQuery}
 * @param {string} filterQuery 		the query to filter all displaying books by
 * @param {function(string)} findShelf from {@link App#findShelf}
 * @param {function(string, string)} handleShelfUpdate from {@link App#handleShelfUpdate}
 */
class Home extends Component {
  props: Props;

  state = {
    slideIndex: 0,
  };

  /**
   * Controller for SwipeableViews tabs component
   * @param  {number} value The number of the tab to display
   */
  handleTabChange = (value: number) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    const {
      books,
      filterQuery,
      clearQuery,
      handleShelfUpdate,
      findShelf,
    } = this.props;

    const shelvedBooks = shelfData.shelves.reduce((map, shelf) => {
      map[shelf] = books.filter((book) => book.shelf === shelf);
      return map;
    }, {});

    const shelfTabs = shelfData.shelves.map((shelf) => {
      return (
        <Tab
          key={shelf + "-tab"}
          label={shelfData.getShelfWithWidth(shelf)}
          value={shelfData.shelves.indexOf(shelf)}
        />
      );
    });

    const showingShelves = shelfData.shelves.map((shelf) => {
      return (
        <Shelf
          key={shelf + "-id"}
          title={shelf}
          books={shelvedBooks[shelf]}
          filterQuery={filterQuery}
          clearQuery={clearQuery}
          handleShelfUpdate={handleShelfUpdate}
          findShelf={findShelf}
        />
      );
    });

    return (
      <div className="home">
        <Tabs
          className="shelf-tabs"
          onChange={this.handleTabChange}
          value={this.state.slideIndex}
        >
          {shelfTabs}
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleTabChange}
          animateHeight={true}
        >
          {showingShelves}
        </SwipeableViews>
      </div>
    );
  }
}

export default Home;
