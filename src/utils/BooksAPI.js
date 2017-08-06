// @flow
// provided helper methods for Udacity React Nanodegree books api
import type { BookType } from '../flowTypes'

const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.getItem('token')
if (!token) {
  token = Math.random().toString(36).substr(-8)
  localStorage.setItem('token', token)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId: string) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book: BookType, shelf: string) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query: string, maxResults: number) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
