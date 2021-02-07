// @flow

// Vendor
import React, { Component } from "react";
import styled from "styled-components";

// Material-UI components
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

// Utils/Common
import { shelfData } from "../common/commonData";
import getWidth, { widths } from "../utils/getWidth";

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/** A flexbox center-aligning div, to line up our table controls */
const Aligner = styled.div`
  align-items: center;
  display: flex;
  padding: 10px;
`;

const styles = {
  button: { marginLeft: "auto" },
};

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
  books: Array<BookType>,
  handleShelfUpdate: (string, string) => void,
};

/** Bulk move page component, located at route /move */
class Move extends Component {
  props: Props;

  state = {
    selectedShelf: "read",
    selected: [],
  };

  /**
   * Return whether or not a given row is selected
   * @param  {number}  index 	index of the row we're checking
   * @return {boolean}       	whether that row is selected
   */
  isSelected = (index: number) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  /**
   * Controller for the Table component.
   * @param  {Array<Number>} selectedRows  the rows the user has selected
   */
  handleRowSelection = (selectedRows: Array<number>) => {
    this.setState({
      selected: selectedRows,
    });
  };

  /**
   * Controller for the DropDownMenu component.
   * @param  {SyntheticEvent} event  					event emitted by component
   * @param  {number} 				index         	index of selected menu item
   * @param  {string} 				selectedShelf 	name of selected shelf
   */
  handleSelectShelf = (
    event: SyntheticEvent,
    index: number,
    selectedShelf: string
  ) => {
    this.setState({ selectedShelf });
  };

  /**
   * Handles bulk movement. Finds the book corresponding to each index in selected,
   * calls the BooksAPI shelf update on each with the shelf from newShelf, then updates
   * app state with the handler from App#handleShelfUpdate
   */
  handleChangeShelves = () => {
    const { books, handleShelfUpdate } = this.props;
    const { selectedShelf, selected } = this.state;
    const selectedBooks = selected.map((index) => books[index]);
    const options = { isBulk: selectedBooks.length > 1 };

    selectedBooks.map((book) =>
      handleShelfUpdate(book, selectedShelf, options)
    );
  };

  render() {
    const { books } = this.props;
    const { selectedShelf } = this.state;
    const wide = getWidth() === widths.large;

    // Map shelfOptions into dropdown menu items for table controls
    const shelfDropdownItems = shelfData.shelves.map((shelf) => {
      return (
        <MenuItem
          key={shelf + "-opt"}
          value={shelf}
          primaryText={shelfData[shelf].wide}
        />
      );
    });

    // Map books into table rows
    const bookRows = books.map((book, index) => {
      return (
        <TableRow key={book.id} selected={this.isSelected(index)}>
          <TableCell>{book.title}</TableCell>
          <TableCell>
            {book.authors ? book.authors.join(", ") : "No author"}
          </TableCell>
          <TableCell>{book.shelf}</TableCell>
          {wide && <TableCell>{book.id}</TableCell>}
        </TableRow>
      );
    });

    return (
      <div className="move-page">
        <Aligner>
          <span>Move {wide ? "books" : ""} to:</span>
          <Select value={selectedShelf} onChange={this.handleSelectShelf}>
            {shelfDropdownItems}
          </Select>
          <Button
            label="Update Shelves"
            style={styles.button}
            primary={true}
            onClick={this.handleChangeShelves}
          />
        </Aligner>
        <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Shelf</TableCell>
              {wide && <TableCell>ID</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody deselectOnClickaway={false}>{bookRows}</TableBody>
        </Table>
      </div>
    );
  }
}

export default Move;
