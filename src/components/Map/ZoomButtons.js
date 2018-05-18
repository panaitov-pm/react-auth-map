import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';


const ZoomButtons = ({onZoomIn, onZoomOut}) => (
	<Button.Group className="map__button">
		<Button onClick={() => onZoomOut(1)} negative>-</Button>
		<Button.Or />
		<Button onClick={() => onZoomIn(1)} positive>+</Button>
	</Button.Group>
);

ZoomButtons.propTypes = {
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired
};

export default ZoomButtons

