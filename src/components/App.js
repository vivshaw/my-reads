// @flow

import React, { Component } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

import TopBar from './TopBar.js';
import Shelf from './Shelf';
import { getAll } from '../utils/BooksAPI';
import { BookType } from '../flowTypes'

class App extends Component {
  state = {
    filterQuery: '',
    menuVisible: false,
    shelves: [],
    shelvedBooks: {}
  }

  toggleMenu = () => {
    this.setState({ menuVisible: !this.state.menuVisible })
  }

  updateQuery = (query: string) => {
    this.setState({ filterQuery: query.trim() });
  };

  clearQuery = () => {
    this.setState({ filterQuery: '' });
  };

  componentDidMount() {
    getAll().then((books: Array<BookType>) => {
      const shelves = Array.from(new Set(books.map(book => book.shelf)))
      const shelvedBooks = shelves.reduce((map, shelf) => {
        map[shelf] = books.filter(book => book.shelf === shelf)
        return map
      }, {})
      this.setState({
        shelves,
        shelvedBooks
      })
    })
  }

  render() {
    const {shelves, shelvedBooks} = this.state;

    const showingShelves = shelves.filter((shelf: string) => shelvedBooks[shelf]).map(shelf => {
      return (
        <Shelf
          key={shelf+'-id'}
          title={shelf}
          books={this.state.shelvedBooks[shelf]}
          filterQuery={this.state.filterQuery}
          clearQuery={this.clearQuery}
        />
      )
    })

    return (
      <div className="App">
        <TopBar filterQuery={this.state.filterQuery} toggleMenu={this.toggleMenu} updateQuery={this.updateQuery} />

        <Sidebar.Pushable as={Segment} attached="bottom">
          <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
            <Menu.Item><Icon name="home" />Home</Menu.Item>
            <Menu.Item><Icon name="search" />Search</Menu.Item>
          </Sidebar>
           <Sidebar.Pusher>
             {showingShelves}
           </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
