import { get, getAll, update, search } from '../BooksAPI';
import { testBooks, jsonHeaders} from '../../testData';

it('fetches correct data', () => {
  fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
  return getAll().then(returnedBooks => {
    expect(returnedBooks).toEqual(testBooks.books)
  });
});
