// @flow

export type Book = {
  id: string,
  title: string,
  subtitle?: string,
  authors: Array<string>,
  description: string,
  imageLinks: {
    thumbnail: string
  }
}
