import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DG from '2gis-maps';

import {getMarker} from '../../AC';
import SaveButton from './SaveButton';
import ShowButton from './ShowButton';
import ZoomButtons from './ZoomButtons';
import ErrorMessage from '../layout/ErrorMessage';
import './Map.scss';

class Map extends Component {
	state = {
		map               : null,
		markers           : {},
		customMarker      : {},
		isActiveShowButton: false,
		hasError: false,
	};

	componentDidMount() {
		const {getMarker} = this.props,
			center = [46.47759, 30.74208],
			markers = DG.layerGroup(),
			customMarker = DG.icon({
				iconUrl   : '/images/map-marker.png',
				iconSize  : [40, 40],
				iconAnchor: [17, 39]
			}),
			map = DG.map(this.map, {
				center,
				'zoom'       : 13,
				'boxZoom'    : false,
				'zoomControl': false
			});

		map.locate({setView: true, watch: true})
		.on('locationfound', function(e) {
			DG.marker([e.latitude, e.longitude]).addTo(map);
		})
		.on('locationerror', function(e) {
			DG.popup()
			.setLatLng(map.getCenter())
			.setContent('Доступ к определению местоположения отключён')
			.openOn(map);

			DG.marker(center).addTo(map);
		});

		this.setState({map, customMarker});

		map.on('click', ({latlng}) => {
			const coords = [latlng.lat.toFixed(6), latlng.lng.toFixed(6)];
			const marker = DG.marker(
				coords,
				{icon: customMarker}
			);
			markers.addLayer(marker).addTo(map);

			getMarker(coords);

			this.setState({markers});
		});
	};

	handleShowMarkers = () => {
		const {markers, map, customMarker} = this.state;
		const {coordinates} = this.props;
		coordinates.map(coords => markers.addLayer(
			DG.marker(coords, {icon: customMarker})
		));
		markers.addTo(map);
	};
	handleRemoveMarkers = () => {
		const {markers} = this.state;
		const layers = markers.getLayers();
		layers.map(layer => markers.removeLayer(layer));
	};
	handleMapZoomIn = (delta) => {
		const {map} = this.state;
		map.zoomIn(delta);
	};
	handleMapZoomOut = (delta) => {
		const {map} = this.state;
		map.zoomOut(delta);
	};
	handleToggleShowButton = (bool) => {
		this.setState({isActiveShowButton: bool});
	};
	handleToggleHasError = (bool) => {
		this.setState({hasError: bool});
	};

	render() {
		const {isActiveShowButton, hasError} = this.state;
		return (
			<div className="map">
				<div className="map__container" ref={node => this.map = node}>
				</div>
				<ZoomButtons onZoomIn={this.handleMapZoomIn}
				             onZoomOut={this.handleMapZoomOut} />
				<SaveButton onRemoveMarkers={this.handleRemoveMarkers}
				            onToggleShowButton={this.handleToggleShowButton}
				            onToggleHasError={this.handleToggleHasError} />
				<ShowButton onShowMarkers={this.handleShowMarkers}
				            onToggleShowButton={this.handleToggleShowButton}
				            isActiveShowButton={isActiveShowButton} />
				{hasError && <ErrorMessage text="You need to SignIn for saving markers"/>}
			</div>
		);
	}
}

Map.propTypes = {
	getMarker  : PropTypes.func.isRequired,
	coordinates: PropTypes.array.isRequired
};

Map.defaultProps = {
	coordinates: []
};


export default connect(
	({user, errors}) => ({
		coordinates: user.coordinates,
	}),
	{getMarker}
)(Map);
