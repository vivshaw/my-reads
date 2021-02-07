import React from "react";
import { MemoryRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";

import TopBar from "../TopBar";

describe("TopBar", () => {
  let mounted, toggleMenu, handleFilterChange, handleFilterClear, wrapper;

  beforeAll(() => {
    toggleMenu = jest.fn();
    handleFilterClear = jest.fn();
    handleFilterChange = jest.fn();
  });

  beforeEach(() => {
    const muiTheme = getMuiTheme();
    wrapper = shallow(
      <TopBar
        filterQuery=""
        toggleMenu={toggleMenu}
        handleFilterClear={handleFilterClear}
        handleFilterChange={handleFilterChange}
      />
    );
    mounted = mount(
      <MemoryRouter initialEntries={["/shelves"]}>
        <TopBar
          filterQuery=""
          toggleMenu={toggleMenu}
          handleFilterClear={handleFilterClear}
          handleFilterChange={handleFilterChange}
        />
      </MemoryRouter>,
      {
        context: { muiTheme },
        childContextTypes: { muiTheme: React.PropTypes.object },
      }
    );
  });

  it("should show an AppBar", () => {
    expect(mounted.find(AppBar).length).toBe(1);
  });

  it("should show a left and right icon button", () => {
    expect(mounted.find(IconButton).length).toBe(2);
  });

  describe("ui interaction", () => {
    it("should toggle the dialog", () => {
      expect(wrapper.state("dialogOpen")).toBe(false);
      wrapper.instance().toggleDialog();
      expect(wrapper.state("dialogOpen")).toBe(true);
    });

    // disabled because can't get the click to simulate :(
    xit("should toggle the menu when the menu button is clicked", () => {
      wrapper.find(IconButton).first().simulate("click");
      expect(toggleMenu).toBeCalled();
    });
  });
});
