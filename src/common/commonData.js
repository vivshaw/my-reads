// @flow

// Utils/Common
import getWidth, { widths } from '../utils/getWidth';

/* ------------------------- SHARED OBJECTS ------------------------- */

/**
 * An array of all the allowed search terms.
 * @type {Array<string>}
 */
export const searchTerms = [
	'Android',
	'Art',
	'Artificial Intelligence',
	'Astronomy',
	'Austen',
	'Baseball',
	'Basketball',
	'Bhagat',
	'Biography',
	'Brief',
	'Business',
	'Camus',
	'Cervantes',
	'Christie',
	'Classics',
	'Comics',
	'Cook',
	'Cricket',
	'Cycling',
	'Desai',
	'Design',
	'Development',
	'Digital Marketing',
	'Drama',
	'Drawing',
	'Dumas',
	'Education',
	'Everything',
	'Fantasy',
	'Film',
	'Finance',
	'First',
	'Fitness',
	'Football',
	'Future',
	'Games',
	'Gandhi',
	'History',
	'History',
	'Homer',
	'Horror',
	'Hugo',
	'Ibsen',
	'Journey',
	'Kafka',
	'King',
	'Lahiri',
	'Larsson',
	'Learn',
	'Literary Fiction',
	'Make',
	'Manage',
	'Marquez',
	'Money',
	'Mystery',
	'Negotiate',
	'Painting',
	'Philosophy',
	'Photography',
	'Poetry',
	'Production',
	'Program Javascript',
	'Programming',
	'React',
	'Redux',
	'River',
	'Robotics',
	'Rowling',
	'Satire',
	'Science Fiction',
	'Shakespeare',
	'Singh',
	'Swimming',
	'Tale',
	'Thrun',
	'Time',
	'Tolstoy',
	'Travel',
	'Ultimate',
	'Virtual Reality',
	'Web Development',
	'iOS'
];

/**
 * Data for the bookshelves in the app
 * @prop {Array<string>} 	shelves 			a list of all 3 shelves in the app
 * @prop {Array<string>} 	maybeShelves 	a list of all 3 shelves, plus the none shelf
 *
 * @prop {Object}					read					the Read shelf
 * @prop {string}					read.narrow		narrow name of the Read shelf
 * @prop {string}					read.wide			wide name of the Read shelf
 *
 * @prop {Object}					wantToRead		the Want to Read shelf
 * @prop {string}					wantToRead.narrow		narrow name of the Want to Read shelf
 * @prop {string}					wantToRead.wide			wide name of the Want to Read shelf
 *
 * @prop {Object}					currentlyReading					the Currently Reading shelf
 * @prop {string}					currentlyReading.narrow		narrow name of the Currently Reading shelf
 * @prop {string}					currentlyReading.wide			wide name of the Currently Reading shelf
 *
 * @prop {Object}					none					the none shelf, for books not on a shelf
 * @prop {string}					none.narrow		narrow name of the none shelf
 * @prop {string}					none.wide			wide name of the none shelf
 *
 * @prop {function(string)} getShelfWithWidth gets the shelf name with width adjusted by window size
 */
export const shelfData = {
	shelves: ['currentlyReading', 'wantToRead', 'read'],
	maybeShelves: ['currentlyReading', 'wantToRead', 'read', 'none'],
	read: {
		narrow: 'Read',
		wide: 'Read'
	},
	wantToRead: {
		narrow: 'Want',
		wide: 'Want to Read'
	},
	currentlyReading: {
		narrow: 'Current',
		wide: 'Currently Reading'
	},
	none: {
		narrow: 'No Shelf',
		wide: 'No Shelf'
	}
};

shelfData.getShelfWithWidth = function(shelf: string) {
	return getWidth() === widths.large ? this[shelf].wide : this[shelf].narrow;
}.bind(shelfData);
