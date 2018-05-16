import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class SignIn extends Component {
	state = {
		data  : {
			name    : '',
			password: ''
		},
		errors: {}
	};

	handleChange = ({target}) => this.setState(({data, errors}) => ({
		data  : {...data, [target.name]: target.value},
		errors: {...errors, [target.name]: ''}
	}));

	handleSubmit = (e) => {
		e.preventDefault();

	};

	render() {
		const {data, errors} = this.state;
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
						<Button type="submit" primary >Sign In</Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	};
}

SignIn.propTypes = {
};

SignIn.defaultProps = {
};


export default SignIn;
