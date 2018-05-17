import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
	return (
		<Route {...rest} render={props =>
			isAuth ? <Component {...props}/> : <Redirect to="/sign-in"/>
		} />
	)
};

PrivateRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
    isAuth: false
};

export default connect(
	({auth}) => ({
		isAuth: auth.isAuth
	}),
	null
)(PrivateRoute);