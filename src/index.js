import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Root from './components/common/Root';
import configureStore from './configureStore';

import {getCurrentUserId} from './AC';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import './index.scss';

const store = configureStore();

if(localStorage.getItem('userId')) {
	const uid = localStorage.getItem('userId');
	store.dispatch(getCurrentUserId(uid));
}

ReactDOM.render(
	<BrowserRouter>
		<Root store={store} />
	</BrowserRouter>,
	document.getElementById('root'));
registerServiceWorker();
