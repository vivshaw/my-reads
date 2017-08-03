import React, { Component } from 'react';
import { getAll } from '../utils/BooksAPI'
import { Card, Image } from 'semantic-ui-react';


class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    getAll().then(books => this.setState({ books }))
  }

  render() {
    const BookList = this.state.books.map((book) => {
      return (
        <Card key={book.title}>
          <Card.Content>
            <Image floated='right' size='mini' src={book.imageLinks.thumbnail} />
            <Card.Header>
              {book.title}
            </Card.Header>
            {book.subtitle &&
              <Card.Meta>
                {book.subtitle}
              </Card.Meta>
            }
            <Card.Description>
              {book.description.substring(0, 140) + "..."}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {book.authors.join(', ')}
          </Card.Content>
        </Card>
      )
    })

    return (
      <div className="App">
        <Card.Group>{BookList}</Card.Group>
      </div>
    );
  }
}

export default App;
