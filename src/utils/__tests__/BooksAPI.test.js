import { get, getAll, update, search } from '../BooksAPI';

const example_books = {
  books: [
    {
      title: "Book 1",
      subtitle: "Subtitle 1",
      description: "lorem ipsum",
      authors: ["Guy One", "Guy Two"],
      imageLinks: { thumbnail: "pic.url" }
    },
    {
      title: "Book 2",
      subtitle: "Subtitle 2",
      description: "dolor sit amet",
      authors: ["Guy Three", "Guy Four"],
      imageLinks: { thumbnail: "pic2.url" }
    },
  ]
}

const headers = new Headers({"Accept": "application/json", "Content-Type":  "application/json"});

it('fetches correct data', () => {
  fetch.mockResponse(JSON.stringify(example_books), { headers });
  return getAll().then(returnedBooks => {
    expect(returnedBooks).toEqual(example_books.books)
  });
});
