import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Transition, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class SignUp extends Component {
	state = {
		data: {
			name: '',
			email: '',
			password: '',
			password2: '',
		},
		errors: {},
		visible  : false
	};

	componentDidMount() {
		this.setState({visible: true});
	}

	componentWillUnmount() {
		this.setState({visible: false});
	}


	handleChange = ({target}) => this.setState(({data, errors}) => ({
		data: {...data, [target.name]: target.value},
		errors: {...errors, [target.name]: ''},
	}));

	handleSubmit = (e) => {
		e.preventDefault();
	};

	render() {
		const {visible, data, errors} = this.state;
		return (
			<Grid centered
			      columns={2}>
				<Grid.Column>
					<Form onSubmit={this.handleSubmit}>
						<Transition.Group animation="fade up" duration={1000}>
							{
								(visible) &&
								<Form.Field >
									<label htmlFor="name">Name</label>
									<input name="name" value={data.name} onChange={this.handleChange} />
								</Form.Field>
							}
						</Transition.Group>
						<Form.Field >
							<label htmlFor="email">Email</label>
							<input name="email" value={data.email} onChange={this.handleChange} type="email" />
						</Form.Field>
						<Form.Field >
							<label htmlFor="password">Password</label>
							<input name="password" value={data.password} onChange={this.handleChange} type="password" />
						</Form.Field>
						<Transition.Group animation="fade down" duration={1000}>
							{
								(visible) &&
								<Form.Field >
									<label htmlFor="password2">Confirm Password</label>
									<input
										name="password2"
										value={data.password2}
										onChange={this.handleChange}
										type="password" />
								</Form.Field>
							}
						</Transition.Group>
						<Button type="submit" primary>Sing Up</Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	};
}

SignUp.propTypes = {
};

SignUp.defaultProps = {
};


export default SignUp;
