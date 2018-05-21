import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';

import Navigation from '../layout/Navigation';
import Main from '../pages/Main';
import Profile from '../pages/Profile';
import SignIn from '../autorization/SignIn';
import SignUp from '../autorization/SignUp';
import Page404 from '../pages/Page404';

import './App.scss';

const App = () => {
	return (
		<Fragment>
			<Navigation />
			<div className="ui container">
				<Switch>
					<Route exact path="/" component={Main} />
					<PrivateRoute path="/profile" component={Profile} />
					<Route path="/sign-in" component={SignIn} />
					<Route path="/sign-up" component={SignUp} />
					<Route component={Page404} />
				</Switch>
			</div>
		</Fragment>
	);
}

export default App;
