import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from 'semantic-ui-react';

class ShowButton extends Component {

	handleShowMarkers = () => {
		const {onShowMarkers, onToggleShowButton} = this.props;
		onShowMarkers();
		onToggleShowButton(false);
	};

	render() {
		const {isLoading, isActiveShowButton} = this.props;
		let showButton = '';

		(isActiveShowButton)
			? showButton = 'show-button is-active'
			: showButton = 'show-button';

		return (
			<div className={showButton}>
				<Button color="orange" loading={isLoading}
				        disabled={isLoading} onClick={this.handleShowMarkers}>
					Show markers
				</Button>

			</div>
		);
	}
}

ShowButton.propTypes = {
	onShowMarkers     : PropTypes.func.isRequired,
	coordinates       : PropTypes.array.isRequired,
	isLoading         : PropTypes.bool.isRequired,
	isActiveShowButton: PropTypes.bool.isRequired
};

export default connect(
	({user}) => ({
		coordinates: user.coordinates,
		isLoading  : user.isLoading
	}),
	null
)(ShowButton);
