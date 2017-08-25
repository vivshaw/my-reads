// @flow

export const getAllRatings = () => {
	let ratings;

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

export const getRating = (id: string): number => {
	const ratings = getAllRatings();

	if (!ratings.hasOwnProperty(id)) {
		setRating(id, 0);
		return 0;
	} else {
		return ratings[id];
	}
};

export const setRating = (id: string, rating: number) => {
	let ratings = getAllRatings();

	ratings[id] = rating;

	localStorage.setItem('ratings', JSON.stringify(ratings));
};
