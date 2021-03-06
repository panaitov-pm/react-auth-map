import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Transition} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import InlineError from '../layout/ErrorMessage';
import {userSignIn} from '../../AC';

class SignIn extends Component {
	state = {
		data   : {
			email   : '',
			password: ''
		},
		errors : {},
		visible: false
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.isAuth) {
			this.props.history.push('/profile');
			this.setState({
				errors: {...nextProps.errors, message: ''}
			});
		} else {
			this.setState({
				errors: {...nextProps.errors}
			});
		}
	}

	componentDidMount() {
		const {isAuth, email, history} = this.props;
		if (isAuth) {
			history.push('/profile');
		}
		this.setState({
			visible: true,
			data   : {...this.state.data, email: email}
		});
	}

	componentWillUnmount() {
		this.setState({
			visible: false,
			data   : {...this.state.data, email: ''}
		});
	}

	handleChange = ({target}) => this.setState(({data, errors}) => ({
		data  : {...data, [target.name]: target.value},
		errors: {...errors, message: ''}
	}));

	handleSubmit = (e) => {
		e.preventDefault();

		const {data} = this.state;
		const {userSignIn, history} = this.props;
		userSignIn(data.email, data.password, history);
		this.setState(({data, errors}) => ({
			data  : {...data, email: '', password: ''},
			errors: {...errors, message: ''}
		}));
	};

	render() {
		const {data, errors, visible} = this.state;
		const {isLoading} = this.props;
		return (
			<Grid centered columns={2}>
				<Grid.Column>
					<Form onSubmit={this.handleSubmit}>
						<Transition.Group animation="fade" duration={1500}>
							{
								(visible) &&
								<Form.Field>
									<label htmlFor="email">Email</label>
									<input
										name="email"
										value={data.email}
										onChange={this.handleChange}
										type="email" />
								</Form.Field>
							}
						</Transition.Group>
						<Transition.Group animation="fade" duration={1500}>
							{
								(visible) &&
								<Form.Field>
									<label htmlFor="password">Password</label>
									<input name="password" value={data.password} onChange={this.handleChange} type="password" />
								</Form.Field>
							}
						</Transition.Group>
						<Button type="submit" primary loading={isLoading} disabled={isLoading}>Sign In</Button>
						{!!errors && <InlineError text={errors.message} />}
					</Form>
				</Grid.Column>
			</Grid>
		);
	};
}

SignIn.propTypes = {
	isAuth   : PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	errors   : PropTypes.object,
	email    : PropTypes.string.isRequired
};

SignIn.defaultProps = {
	isAuth   : false,
	isLoading: false,
	errors   : {},
	email    : ''
};


export default connect(
	({auth, errors, user}) => ({
		isAuth   : auth.isAuth,
		isLoading: auth.isLoading,
		errors,
		email    : user.data.email
	}),
	{userSignIn}
)(withRouter(SignIn));
