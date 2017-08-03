import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { testBooks, jsonHeaders } from '../../testData'

it('renders without crashing', () => {
  fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
