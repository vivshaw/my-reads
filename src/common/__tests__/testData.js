/* -------------------------- TEST DATA -------------------------- */

/* Test book data needed for the Jest & Enzyme suite */
const testBooks = {
	books: [
		{
			title: 'A Book Titled 1',
			subtitle: 'A Subtitle',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			authors: ['Author One', 'Author Two'],
			imageLinks: { thumbnail: 'http://cover.gif' },
			id: 'nggnmAEACAAJ',
			shelf: 'wantToRead'
		},
		{
			title: 'Book 2: Electric Boogaloo',
			subtitle: 'Another Subtitle #2',
			description:
				'Suspendisse facilisis varius sem, ut auctor sem pulvinar sed.',
			authors: ['Guy Three', 'Guy Four'],
			imageLinks: { thumbnail: 'http://pic2.jpg' },
			id: 'sJf1vQAACAAJ',
			shelf: 'read'
		},
		{
			title: '3: The Threequel',
			subtitle: 'The 3rd and Final Subtitle',
			description:
				'Maecenas justo nunc, lobortis et volutpat vel, tempor quis tellus.',
			authors: ['Writer Five', 'Writer Six'],
			imageLinks: { thumbnail: 'http://bookCover.png' },
			id: 'bKs2xWEECBAL',
			shelf: 'read'
		}
	]
};

/* Test books with insecure URLs replaced with https */
const secureTestBooks = testBooks.books.map(book => {
	return Object.assign({}, book, {
		imageLinks: { thumbnail: 'https' + book.imageLinks.thumbnail.substring(4) }
	});
});

/* JSON headers for API requests */
const jsonHeaders = new Headers({
	Accept: 'application/json',
	'Content-Type': 'application/json'
});

export { testBooks, secureTestBooks, jsonHeaders };
