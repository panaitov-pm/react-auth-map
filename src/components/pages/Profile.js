import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Transition} from 'semantic-ui-react';
import Spinner from 'react-spinkit';

import Map from '../Map';
import {getUserInfo} from '../../AC';

import './Profile.scss'

class Profile extends Component {

	componentDidMount() {
		this.props.getUserInfo(this.props.uid);
	}

	render() {
		const {isLoading, user} = this.props;
		return (
			<div className="profile">
			{isLoading
				? <Spinner name="folding-cube" color="coral"/>
				: <Transition.Group animation="fade" duration={1500}>
					{
						(!isLoading) &&
						<div>
							<h1>Profile</h1>
							<p>Name: {user.name}</p>
							<p>Email: {user.email}</p>
						</div>
					}
				</Transition.Group>
			}
			<Map />
			</div>

		);
	}
}

Profile.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	user: PropTypes.object,
	uid: PropTypes.string.isRequired,
};

Profile.defaultTypes = {
	isLoading: true,
	user: {},
	uid: ''
};

export default connect(
	({auth, user}) => ({
		isLoading: user.isLoading,
		uid: auth.profile.uid,
		user: user.data,
	}),
	{getUserInfo}
)(Profile);
