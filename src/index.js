// Vendor
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-snapshot';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

// Components
import App from './components/App';

// Styles
import 'sanitize.css';
import './index.css';
import 'typeface-roboto';

// needed so tap events work in Material-UI
injectTapEventPlugin();

// React is go!
render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

// Activate CRA's service worker for offline app use
registerServiceWorker();
