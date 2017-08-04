import React, { Component } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

import TopBar from './TopBar.js';
import BookList from './BookList';
import { getAll } from '../utils/BooksAPI';

class App extends Component {
  state = {
    books: [],
    filterQuery: '',
    menuVisible: false
  }

  toggleMenu = () => {
    this.setState({ menuVisible: !this.state.menuVisible })
  }

  updateQuery = query => {
    console.log(query);
    this.setState({ filterQuery: query.trim() });
  };

  clearQuery = () => {
    this.setState({ filterQuery: '' });
  };

  componentDidMount() {
    getAll().then(books => this.setState({ books }))
  }

  render() {
    return (
      <div className="App">
        <TopBar toggleMenu={this.toggleMenu} updateQuery={this.updateQuery} />

        <Sidebar.Pushable as={Segment} attached="bottom">
          <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
            <Menu.Item><Icon name="home" />Home</Menu.Item>
            <Menu.Item><Icon name="search" />Search</Menu.Item>
          </Sidebar>
           <Sidebar.Pusher>
                <Segment basic>
                  <BookList
                    books={this.state.books}
                    filterQuery={this.state.filterQuery}
                    clearQuery={this.clearQuery}
                  />
                </Segment>
           </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
