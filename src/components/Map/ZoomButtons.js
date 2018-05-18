import React from 'react'
import PropTypes from 'prop-types';
import {Button, Icon} from 'semantic-ui-react';


const ZoomButtons = ({onZoomIn, onZoomOut}) => (
	<Button.Group className="map__button">
		<Button onClick={() => onZoomOut(1)} negative>
			<Icon name='minus'/>
		</Button>
		<Button.Or />
		<Button onClick={() => onZoomIn(1)} positive>
			<Icon name='plus'/>
		</Button>
	</Button.Group>
);

ZoomButtons.propTypes = {
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired
};

export default ZoomButtons

