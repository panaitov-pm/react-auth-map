import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import App from '../app/App';

const Root = ({store}) => (
	<Provider store={store}>
		<Fragment>
			<App />
		</Fragment>
	</Provider>
);

export default Root;
