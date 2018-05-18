import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon, Label} from 'semantic-ui-react';
import {saveMarkers} from '../../AC';

class SaveButton extends Component {

	handleSaveMarkers = () => {
		const {coordinates, saveMarkers, uid, onRemoveMarkers} = this.props;
		saveMarkers(uid, coordinates);
		onRemoveMarkers();

	};
	render() {
		const {coordinates, isLoading} = this.props,
			coordinatesCount = coordinates.length;
		let showButton = '';

		(coordinatesCount > 0)
			? showButton = 'save-button is-active'
			: showButton = 'save-button';

		return (
			<div className={showButton}>
				<Button animated="vertical" color="purple" loading={isLoading}
				        disabled={isLoading} onClick={this.handleSaveMarkers}>
					<Button.Content visible>
						<Icon name="marker" />
						Markers
					</Button.Content>
					<Button.Content hidden>
						Save
					</Button.Content>
				</Button>
				<Label color="purple" pointing>{coordinatesCount}</Label>

			</div>
		);
	}
}

SaveButton.propTypes = {
	coordinates    : PropTypes.array.isRequired,
	saveMarkers: PropTypes.func.isRequired,
	isLoading  : PropTypes.bool.isRequired,
	uid        : PropTypes.string.isRequired
};

export default connect(
	({user, auth}) => ({
		coordinates  : user.coordinates,
		isLoading: user.isLoading,
		uid      : auth.profile.uid
	}),
	{saveMarkers}
)(SaveButton);
