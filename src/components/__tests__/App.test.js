import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from 'semantic-ui-react'
import { mount } from 'enzyme'

import App from '../App';
import TopBar from '../TopBar'
import Shelf from '../Shelf'
import { testBooks, jsonHeaders } from '../../common/testData'

describe('App', () => {
  let wrapper;

  beforeAll(() => {
    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
    wrapper = mount(<App />)
  })

  it('renders without crashing', () => {
    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders the correct number of shelves', () => {
    expect(wrapper.find(Shelf).length).toBe(2)
  })

  it('renders a TopBar', () => {
    expect(wrapper.find(TopBar).length).toBe(1)
  })

  it('renders a toggleable Sidebar', () => {
    expect(wrapper.find(Sidebar).length).toBe(1)
  })

  describe('ui interaction', () => {
    it('shows and hides the sidebar', () => {
      expect(wrapper.state('menuVisible')).toBe(false)
      wrapper.instance().toggleMenu()
      expect(wrapper.state('menuVisible')).toBe(true)
      wrapper.instance().toggleMenu()
      expect(wrapper.state('menuVisible')).toBe(false)
    })

    it('updates the query', () => {
      const testQuery = "test"

      expect(wrapper.state('filterQuery')).toBe('')
      wrapper.instance().updateQuery(testQuery)
      expect(wrapper.state('filterQuery')).toBe(testQuery)
    })

    it('clears the query', () => {
      const testQuery = "test"

      wrapper.instance().updateQuery(testQuery)
      expect(wrapper.state('filterQuery')).toBe(testQuery)
      wrapper.instance().clearQuery()
      expect(wrapper.state('filterQuery')).toBe('')
    })
  })
})
