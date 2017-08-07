const testBooks = {
	books: [
		{
			title: 'A Book Titled 1',
			subtitle: 'A Subtitle',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			authors: ['Author One', 'Author Two'],
			imageLinks: { thumbnail: 'cover.gif' },
			id: 'nggnmAEACAAJ',
			shelf: 'testShelf'
		},
		{
			title: 'Book 2: Electric Boogaloo',
			subtitle: 'Another Subtitle #2',
			description:
				'Suspendisse facilisis varius sem, ut auctor sem pulvinar sed.',
			authors: ['Guy Three', 'Guy Four'],
			imageLinks: { thumbnail: 'pic2.jpg' },
			id: 'sJf1vQAACAAJ',
			shelf: 'testShelf'
		},
		{
			title: '3: The Threequel',
			subtitle: 'The 3rd and Final Subtitle',
			description:
				'Maecenas justo nunc, lobortis et volutpat vel, tempor quis tellus.',
			authors: ['Writer Five', 'Writer Six'],
			imageLinks: { thumbnail: 'bookCover.png' },
			id: 'bKs2xWEECBAL',
			shelf: 'testShelfTwo'
		}
	]
};

const jsonHeaders = new Headers({
	Accept: 'application/json',
	'Content-Type': 'application/json'
});

export { testBooks, jsonHeaders };
