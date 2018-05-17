import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Transition} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {userSignUp} from '../../AC';
import InlineError from '../layout/errorMessage';


class SignUp extends Component {
	state = {
		data   : {
			name     : '',
			email    : '',
			password : '',
			password2: ''
		},
		errors : {},
		visible: false
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			errors: {...nextProps.errors}
		});
	}

	componentDidMount() {
		this.setState({visible: true});
		const {isAuth, history} = this.props;
		isAuth && history.push('/profile');
	}

	componentWillUnmount() {
		this.setState({visible: false});
	}


	handleChange = ({target}) => this.setState(({data, errors}) => ({
		data  : {...data, [target.name]: target.value},
		errors: {...errors, message: ''}
	}));

	handleSubmit = (e) => {
		e.preventDefault();
		const {userSignUp, history} = this.props;
		const {data, errors} = this.state;
		if (data.password !== data.password2) {
			this.setState({
				errors: {...errors, message: 'Password and Confirm password are not the same'}
			});
			return;
		}
		if (data.name.trim() === '') {
			this.setState({
				errors: {...errors, message: 'Name field is empty'}
			});
			return;
		}
		userSignUp(data.name, data.email, data.password, history);
		this.setState({
			errors: {...errors, message: ''}
		});
	};

	render() {
		const {visible, data, errors} = this.state;
		const {isLoading} = this.props;

		return (
			<Grid centered
			      columns={2}>
				<Grid.Column>
					<Form onSubmit={this.handleSubmit}>
						<Transition.Group animation="fade up" duration={1000}>
							{
								(visible) &&
								<Form.Field>
									<label htmlFor="name">Name</label>
									<input name="name" value={data.name} onChange={this.handleChange} />
								</Form.Field>
							}
						</Transition.Group>
						<Transition.Group animation="fade" duration={1500}>
							{
								(visible) &&
								<Form.Field>
									<label htmlFor="email">Email</label>
									<input name="email" value={data.email} onChange={this.handleChange} type="email" />
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
						<Transition.Group animation="fade down" duration={1000}>
							{
								(visible) &&
								<Form.Field>
									<label htmlFor="password2">Confirm Password</label>
									<input
										name="password2"
										value={data.password2}
										onChange={this.handleChange}
										type="password" />
								</Form.Field>
							}
						</Transition.Group>
						<Button type="submit" primary loading={isLoading} disabled={isLoading}>Sing Up</Button>
						{!!errors && <InlineError text={errors.message} />}
					</Form>
				</Grid.Column>
			</Grid>
		);
	};
}

SignUp.propTypes = {
	userSignUp: PropTypes.func.isRequired,
	errors    : PropTypes.object.isRequired,
	isLoading : PropTypes.bool.isRequired,
	isAuth    : PropTypes.bool.isRequired
};

SignUp.defaultProps = {
	userSignUp: () => {
	},
	errors    : {},
	isLoading : false,
	isAuth    : false
};


export default connect(
	({auth, errors}) => ({
		isAuth   : auth.isAuth,
		isLoading: auth.isLoading,
		errors   : errors
	}),
	{userSignUp}
)(withRouter(SignUp));
