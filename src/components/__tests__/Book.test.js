import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { shallow, mount } from 'enzyme';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Book from '../Book';
import { testBooks } from '../../common/testData';

describe('Book', () => {
	let book, wrapper, mounted, handleShelfUpdate, setRating;

	beforeAll(() => {
		book = testBooks.books[0];
		handleShelfUpdate = jest.fn();
		setRating = jest.fn();

		wrapper = shallow(
			<Book
				key={book.id}
				title={book.title}
				subtitle={book.subtitle}
				description={book.description}
				authors={book.authors}
				coverImageUrl={book.imageLinks.thumbnail}
				handleShelfUpdate={handleShelfUpdate}
				book={book}
			/>
		);

		const muiTheme = getMuiTheme();
		injectTapEventPlugin();
		mounted = mount(
			<Book
				key={book.id}
				title={book.title}
				subtitle={book.subtitle}
				description={book.description}
				authors={book.authors}
				coverImageUrl={book.imageLinks.thumbnail}
				handleShelfUpdate={handleShelfUpdate}
				book={book}
			/>,
			{
				context: { muiTheme },
				childContextTypes: { muiTheme: React.PropTypes.object }
			}
		);
	});

	it("should show the book's cover", () => {
		expect(
			wrapper.containsMatchingElement(<img src={book.imageLinks.thumbnail} />)
		).toBe(true);
	});

	it("should show the book's title", () => {
		expect(mounted.text().includes(book.title)).toBe(true);
	});

	it("should show the book's subtitle", () => {
		expect(mounted.text().includes(book.subtitle)).toBe(true);
	});

	it("should show all the book's authors", () => {
		book.authors.forEach(author => {
			expect(mounted.text().includes(author)).toBe(true);
		});
	});

	it("should show the book's description", () => {
		expect(mounted.text().includes(book.description.substring(0, 140))).toBe(
			true
		);
	});

	describe('ui interaction', () => {
		it('can change the shelf', () => {
			expect(mounted.state('shelf')).toBe(book.shelf);
			mounted.instance().handleChangeShelf({}, 0, 'currentlyReading');
			expect(mounted.state('shelf')).toBe('currentlyReading');
		});

		it('can change the rating', () => {
			expect(mounted.state('rating')).toBe(0);
			mounted.instance().handleChangeRating(1);
			expect(mounted.state('rating')).toBe(1);
		});
	});
});
