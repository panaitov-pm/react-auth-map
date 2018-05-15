import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Button, Menu, Image, Icon} from 'semantic-ui-react';
import logo from '../../logo.svg';

import './navigation.scss';

const Navigation = () => {
	return (
		<Menu>
			<Menu.Item>
				<NavLink exact to="/"><Image src={logo} size="tiny" /></NavLink>
			</Menu.Item>
			<Menu.Item>
				<NavLink activeClassName="active" to="/profile">Profile</NavLink>
			</Menu.Item>
			<Menu.Menu position="right">
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
					<Button animated basic color=" purple">
						<Button.Content visible>
							<NavLink to="/sign-up">Sign Up</NavLink>
						</Button.Content>
						<Button.Content hidden purple>
							<NavLink to="/sign-up" >
								<Icon name=" add user" size=" large" />
							</NavLink>
						</Button.Content>
					</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default Navigation;
