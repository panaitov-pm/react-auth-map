import React from 'react';
import DevTools from './DevTools';
import {Provider} from 'react-redux';
import App from '../app/App';

const Root = ({store}) => (
	<Provider store={store}>
		<div>
			<App />
			<DevTools />
		</div>
	</Provider>
);

export default Root;