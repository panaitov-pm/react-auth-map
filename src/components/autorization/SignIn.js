import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import InlineError from '../layout/errorMessage';
import {userSignIn} from '../../AC';

class SignIn extends Component {
	state = {
		data  : {
			email    : '',
			password: ''
		},
		errors: {}
	};
	componentWillReceiveProps(nextProps) {
		if(nextProps.isAuth) {
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
		if(this.props.isAuth) {
			this.props.history.push('/profile');
		}
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
		const {data, errors} = this.state;
		const {isLoading} = this.props;
		return (
			<Grid centered columns={2}>
				<Grid.Column>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field >
							<label htmlFor="email">Email</label>
							<input
								name="email"
								value={data.email}
								onChange={this.handleChange}
								type="email" />
						</Form.Field>
						<Form.Field >
							<label htmlFor="password">Password</label>
							<input
								name="password"
								onChange={this.handleChange}
								type="password" />
						</Form.Field>
						<Button type="submit" primary loading={isLoading} disabled={isLoading} >Sign In</Button>
						{!!errors && <InlineError text={errors.message} />}
					</Form>
				</Grid.Column>
			</Grid>
		);
	};
}

SignIn.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	errors: PropTypes.object,
};

SignIn.defaultProps = {
	isAuth: false,
	isLoading: false,
	errors: {}
};


export default connect(
	({auth, errors}) => ({
		isAuth: auth.isAuth,
		isLoading: auth.isLoading,
		errors: errors,
	}),
	{userSignIn}
)(withRouter(SignIn));
