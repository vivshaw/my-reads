import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

const example_books = {
  books: [
    {
      title: "Book 1",
      subtitle: "Subtitle 1",
      description: "lorem ipsum",
      authors: ["Guy One", "Guy Two"],
      imageLinks: { thumbnail: "pic.url" },
      id: "nggnmAEACAAJ"
    },
    {
      title: "Book 2",
      subtitle: "Subtitle 2",
      description: "dolor sit amet",
      authors: ["Guy Three", "Guy Four"],
      imageLinks: { thumbnail: "pic2.url" },
      id: "sJf1vQAACAAJ"
    },
  ]
}

it('renders without crashing', () => {
  let headers = new Headers({"Accept": "application/json", "Content-Type":  "application/json"});
  fetch.mockResponse(JSON.stringify(example_books), { headers });

  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
