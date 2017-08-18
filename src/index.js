import React from 'react';
import { render } from 'react-snapshot';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import 'sanitize.css';

injectTapEventPlugin();

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();
