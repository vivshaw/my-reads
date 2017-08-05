// @flow

import React from 'react';
import { Icon, Input, Menu } from 'semantic-ui-react';

const TopBar = (
  props: {
    toggleMenu: () => void,
    updateQuery: (query: string) => void
  }) => {

  return (
    <Menu secondary attached="top">
      <Menu.Item onClick={() => props.toggleMenu()} >
        <Icon name="sidebar" />
      </Menu.Item>
      <Menu.Item>
          <Input
            icon='filter'
            placeholder='Filter books...'
            onChange={event => props.updateQuery(event.target.value)}
          />
      </Menu.Item>
    </Menu>
  )
}

export default TopBar;
