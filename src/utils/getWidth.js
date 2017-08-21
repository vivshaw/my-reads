// @flow

// MUI's withWidth HOC is great, bbut doesn't support server-side rendering. So,
// I had to ditch it & write my own mediocre width handler so that React-Snapshot
// will do its thing.

import { SMALL, MEDIUM, LARGE } from 'material-ui/utils/withWidth';

export const widths = { small: SMALL, medium: MEDIUM, large: LARGE };

const getWidth = () => {
	let width;
	const largeWidth = 992,
		mediumWidth = 768;

	const innerWidth = window.innerWidth;

	if (innerWidth >= largeWidth) {
		width = LARGE;
	} else if (innerWidth >= mediumWidth) {
		width = MEDIUM;
	} else {
		width = SMALL;
	}

	return width;
};

export default getWidth;
