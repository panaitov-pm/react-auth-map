import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DG from '2gis-maps';

import {getMarker} from '../../AC';
import SaveButton from './SaveButton';
import ZoomButtons from './ZoomButtons';
import './Map.scss';

class Map extends Component {
	state = {
		map: null,
		coords: [],
		markers: {},
	};
	componentDidMount() {
		const {getMarker} = this.props,
			center = [46.47759, 30.74208],
			markers = DG.featureGroup(),
			customMarker = DG.icon({
			iconUrl: '/images/map-marker.png',
			iconSize: [40, 40],
			iconAnchor: [17, 39],
		}),
			map = DG.map(this.map, {
			center,
			'zoom': 13,
			'boxZoom': false,
			'zoomControl': false,
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
		this.setState({map});

		map.on('click', ({latlng}) => {
			const coords = [latlng.lat.toFixed(4), latlng.lng.toFixed(4)];
			DG.marker(
				coords,
				{icon: customMarker}
			).addTo(markers);
			markers.addTo(map);
			map.fitBounds(markers.getBounds());
			getMarker(coords);
		this.setState({markers});
		});
	};
	handleRemoveMarkers = () => {
		const {markers, map} = this.state;
		markers.removeFrom(map);
	}
	handleMapZoomIn = (delta) => {
		const {map} = this.state;
		map.zoomIn(delta);
	};
	handleMapZoomOut = (delta) => {
		const {map} = this.state;
		map.zoomOut(delta);
	};

	render() {
		return (
			<div className="map">
				<div className="map__container" ref={node => this.map = node}>
				</div>
				<ZoomButtons onZoomIn={this.handleMapZoomIn} onZoomOut={this.handleMapZoomOut}/>
				<SaveButton map={this.state.map} onRemoveMarkers={this.handleRemoveMarkers} />
			</div>
		);
	}
}

Map.propTypes = {
    getMarker: PropTypes.func.isRequired,
};


export default connect(
	null,
	{getMarker}
)(Map);
