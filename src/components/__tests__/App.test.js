import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

import App from "../App";
import TopBar from "../TopBar";
import SideBar from "../SideBar";
import { testBooks, jsonHeaders } from "../../common/testData";

describe("App", () => {
  let wrapper, update;

  beforeAll(() => {
    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
    wrapper = shallow(<App />);
    update = jest.fn();
  });

  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      div
    );
  });

  it("renders a TopBar", () => {
    expect(wrapper.find(TopBar).length).toBe(1);
  });

  it("renders a SideBar", () => {
    expect(wrapper.find(SideBar).length).toBe(1);
  });

  describe("ui interaction", () => {
    it("shows and hides the sidebar", () => {
      expect(wrapper.state("menuVisible")).toBe(false);
      wrapper.instance().toggleMenu();
      expect(wrapper.state("menuVisible")).toBe(true);
      wrapper.instance().toggleMenu();
      expect(wrapper.state("menuVisible")).toBe(false);
    });

    it("updates the query", () => {
      const testQuery = "test";

      expect(wrapper.state("filterQuery")).toBe("");
      wrapper.instance().handleFilterChange(testQuery);
      expect(wrapper.state("filterQuery")).toBe(testQuery);
    });

    it("clears the query", () => {
      const testQuery = "test";

      wrapper.instance().handleFilterChange(testQuery);
      expect(wrapper.state("filterQuery")).toBe(testQuery);
      wrapper.instance().handleFilterClear();
      expect(wrapper.state("filterQuery")).toBe("");
    });

    it("sets SideBar visibility", () => {
      expect(wrapper.state("menuVisible")).toBe(false);
      wrapper.instance().toggleMenu();
      expect(wrapper.state("menuVisible")).toBe(true);
    });

    it("closes the sidebar", () => {
      wrapper.instance().handleMenuClose();
      expect(wrapper.state("menuVisible")).toBe(false);
    });

    it("opens the snackbar", () => {
      wrapper.instance().handleSnackbarOpen();
      expect(wrapper.state("snackbarOpen")).toBe(true);
    });

    it("closes the snackbar", () => {
      wrapper.instance().handleRequestClose();
      expect(wrapper.state("snackbarOpen")).toBe(false);
    });

    // Having trouble testing handleShelfUpdate and findShelf because they need
    // to be mounted, but then I need to wrap it in a router, so the element isn't
    // root and I can't access state
  });
});
