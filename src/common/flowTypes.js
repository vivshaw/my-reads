// @flow

export type BookType = {
	id: string,
	title: string,
	subtitle: string,
	authors: Array<string>,
	description: string,
	shelf: string,
	imageLinks: {
		thumbnail: string
	}
};
