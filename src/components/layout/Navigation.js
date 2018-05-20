import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import {Button, Menu, Image, Icon} from 'semantic-ui-react';
import logo from '../../logo.svg';

import './navigation.scss';
import { connect } from 'react-redux';
import { signOut } from '../../AC';

const Navigation = ({isAuth, signOut, history}) => {
	return (
		<Menu>
			<Menu.Item>
				<NavLink exact to="/"><Image src={logo} size="tiny" /></NavLink>
			</Menu.Item>
			{
				isAuth
					&& <Menu.Item>
							<NavLink activeClassName="active" to="/profile">Profile</NavLink>
						</Menu.Item>
			}
			{
				isAuth
				&& <Menu.Item>
					<NavLink exact to="/">Map</NavLink>
				</Menu.Item>
			}
			{
				isAuth
				? <Menu.Menu position="right">
						<Menu.Item>
							<Button animated basic color="blue" onClick={() =>signOut(history)}>
								<Button.Content visible><p>Sign Out</p></Button.Content>
								<Button.Content hidden>
									<p><Icon name="sign out" size="large" /> </p>
								</Button.Content>
							</Button>
						</Menu.Item>
					</Menu.Menu>
				: <Menu.Menu position="right">
						<Menu.Item>
							<Button animated color="green">
								<Button.Content visible>
									<NavLink to="/sign-in">Sign In</NavLink>
								</Button.Content>
								<Button.Content hidden>
									<NavLink to="/sign-in">
										<Icon name="sign in" size="large" />
									</NavLink>
								</Button.Content>
							</Button>
						</Menu.Item>
						<Menu.Item>
							<Button animated basic color="purple">
								<Button.Content visible>
									<NavLink to="/sign-up">Sign Up</NavLink>
								</Button.Content>
								<Button.Content hidden>
									<NavLink to="/sign-up" >
										<Icon name="add user" size="large" />
									</NavLink>
								</Button.Content>
							</Button>
						</Menu.Item>
					</Menu.Menu>
			}

		</Menu>
	);
};

Navigation.propTypes = {
    isAuth: PropTypes.bool.isRequired,
	signOut: PropTypes.func.isRequired,
};

Navigation.defaultTypes = {
	isAuth: false,
	signOut: () => {},
};


export default connect(
	({auth}) => ({
		isAuth: auth.isAuth
	}),
	{signOut}
)(withRouter(Navigation));
