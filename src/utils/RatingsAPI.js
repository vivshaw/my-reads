// @flow

/* localStorage API for book rating system. Since the books API has no ratings,
   we'll just store them in localStorage & provide helpers to abstract over that. */

/**
 * Get all the ratings for all books
 * @return {ratings} An object containing a key for each rated book with a value that is that book's rating
 */
export const getAllRatings = () => {
	let ratings;

	/* If ratings aren't yet initialized, do that first. If they're unsupported
	   due to being on the server-side, make ratings an empty object. */
	try {
		let ratingsItem = localStorage.getItem('ratings');

		if (!ratingsItem) {
			ratings = {};
			localStorage.setItem('ratings', JSON.stringify(ratings));
		} else {
			ratings = JSON.parse(ratingsItem);
		}
	} catch (e) {
		ratings = {};
	}

	return ratings;
};

/**
 * Get the rating for a particular book, by ID
 * @param  {string} id the id of the book we want the rating for
 * @return {number}    the rating of that book
 */
export const getRating = (id: string): number => {
	const ratings = getAllRatings();

	if (!ratings.hasOwnProperty(id)) {
		setRating(id, 0);
		return 0;
	} else {
		return ratings[id];
	}
};

/**
 * Set the rating for a particular book, by id.
 * @param {string} id     the id of the book to rate
 * @param {number} rating the rating to assign
 */
export const setRating = (id: string, rating: number) => {
	let ratings = getAllRatings();

	ratings[id] = rating;

	localStorage.setItem('ratings', JSON.stringify(ratings));
};
