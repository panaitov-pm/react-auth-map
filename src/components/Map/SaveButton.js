import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Icon, Label} from 'semantic-ui-react';
import {saveMarkers} from '../../AC';

class SaveButton extends Component {

	handleSaveMarkers = () => {
		const {
			coordinates, address, saveMarkers, uid,
			onRemoveMarkers, onToggleShowButton,
			onToggleHasError
		} = this.props;
		if (uid.length === 0) {
			onToggleHasError(true);
			return false;
		} else {
			onToggleHasError(false);
			saveMarkers(uid, coordinates, address);
			onRemoveMarkers();
			onToggleShowButton(true);
		}

	};

	render() {
		const {coordinates, isLoading} = this.props,
			coordinatesCount = coordinates.length;
		let saveButton = '';

		(coordinatesCount > 0)
			? saveButton = 'save-button is-active'
			: saveButton = 'save-button';

		return (
			<div className={saveButton}>
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
	coordinates       : PropTypes.array.isRequired,
	address           : PropTypes.array.isRequired,
	saveMarkers       : PropTypes.func.isRequired,
	onRemoveMarkers   : PropTypes.func.isRequired,
	onToggleShowButton: PropTypes.func.isRequired,
	isLoading         : PropTypes.bool.isRequired,
	uid               : PropTypes.string
};

SaveButton.defaultProps = {
	uid: ''
};


export default connect(
	({user, auth}) => ({
		coordinates: user.coordinates,
		address    : user.address,
		isLoading  : user.isLoading,
		uid        : auth.profile.uid
	}),
	{saveMarkers}
)(SaveButton);
