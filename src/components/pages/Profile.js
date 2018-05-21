import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Transition} from 'semantic-ui-react';
import Spinner from 'react-spinkit';
import {generate as id} from 'shortid';

import {getUserInfo} from '../../AC';

import './Profile.scss'

class Profile extends Component {

	componentDidMount() {
		this.props.getUserInfo(this.props.uid);
	}

	render() {
		const {isLoading, user, address} = this.props;
		return (
			<div className="profile">
				{isLoading
					? <Spinner name="folding-cube" color="coral" />
					: <Transition.Group animation="fade" duration={1500}>
						{
							(!isLoading) &&
							<div>
								<h1>Profile</h1>
								<p>Name: {user.name}</p>
								<p>Email: {user.email}</p>
								<Table celled striped>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell colSpan="3">Выбранные адреса:</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										{
											address.map(item => (
												<Table.Row key={id()}>
													<Table.Cell>{item}</Table.Cell>
												</Table.Row>
											))
										}
									</Table.Body>
								</Table>
							</div>
						}
					</Transition.Group>
				}
			</div>

		);
	}
}

Profile.propTypes = {
  address: PropTypes.array.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  user: PropTypes.object
};

Profile.defaultTypes = {
	isLoading: true,
	user     : {},
	uid      : '',
	address  : []
};

export default connect(
	({auth, user}) => ({
		isLoading: user.isLoading,
		uid      : auth.profile.uid,
		user     : user.data,
		address  : user.address
	}),
	{getUserInfo}
)(Profile);
