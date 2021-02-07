import React from "react";
import { shallow, mount } from "enzyme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import Move from "../Move";

import { testBooks } from "../../common/testData";

describe("Move", () => {
  let books, handleShelfUpdate, mounted, wrapper;

  beforeAll(() => {
    books = testBooks.books;
    handleShelfUpdate = jest.fn();
  });

  beforeEach(() => {
    const muiTheme = getMuiTheme();

    wrapper = shallow(
      <Move books={books} handleShelfUpdate={handleShelfUpdate} />
    );

    mounted = mount(
      <Move books={books} handleShelfUpdate={handleShelfUpdate} />,
      {
        context: { muiTheme },
        childContextTypes: { muiTheme: React.PropTypes.object },
      }
    );
  });

  it("should render a bulk move page", () => {
    expect(wrapper.find(".move-page").length).toBe(1);
  });

  it("can select rows", () => {
    const toSelect = [1, 2];

    expect(mounted.state("selected")).toEqual([]);
    mounted.instance().handleRowSelection(toSelect);
    expect(mounted.state("selected")).toEqual(toSelect);
  });

  it("can tell which rows are selected", () => {
    const toSelect = [1, 2];

    mounted.instance().handleRowSelection(toSelect);
    expect(mounted.instance().isSelected(1)).toBe(true);
    expect(mounted.instance().isSelected(2)).toBe(true);
    expect(mounted.instance().isSelected(0)).toBe(false);
    expect(mounted.instance().isSelected(3)).toBe(false);
  });

  it("can select a shelf", () => {
    expect(mounted.state("selectedShelf")).toEqual("read");
    mounted.instance().handleSelectShelf({}, 1, "currentlyReading");
    expect(mounted.state("selectedShelf")).toEqual("currentlyReading");
  });

  it("can move books to the selected shelf", () => {
    const toSelect = [1, 2];

    mounted.instance().handleRowSelection(toSelect);
    mounted.instance().handleChangeShelves();
    expect(handleShelfUpdate).toHaveBeenCalledTimes(2);
  });
});
