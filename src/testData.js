const testBooks = {
  books: [
    {
      title: "Book 1",
      subtitle: "Subtitle 1",
      description: "lorem ipsum",
      authors: ["Guy One", "Guy Two"],
      imageLinks: { thumbnail: "pic.url" },
      id: "nggnmAEACAAJ",
      shelf: "testShelf"
    },
    {
      title: "Book 2",
      subtitle: "Subtitle 2",
      description: "dolor sit amet",
      authors: ["Guy Three", "Guy Four"],
      imageLinks: { thumbnail: "pic2.url" },
      id: "sJf1vQAACAAJ",
      shelf: "testShelf"
    },
    {
      title: "Book 3",
      subtitle: "Subtitle 3",
      description: "dolor sit amet",
      authors: ["Guy Three", "Guy Four"],
      imageLinks: { thumbnail: "pic3.url" },
      id: "sJf1vQAACBAJ",
      shelf: "testShelfTwo"
    },
  ]
}

const jsonHeaders = new Headers(
  {
    "Accept": "application/json",
    "Content-Type":  "application/json"
  }
);

export { testBooks, jsonHeaders }
