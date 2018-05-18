import React, {Component} from 'react';
import DG from '2gis-maps';

import './Map.scss';
import ZoomButtons from './ZoomButtons';

class Map extends Component {
	state = {
		map: null,
		coords: [],
	};
	componentDidMount() {
		const map = DG.map(this.map, {
			'center': [54.98, 82.89],
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
		});
		this.setState({map});
		let coords = [];
		map.on('click', ({latlng}) => this.setState({coords: [...latlng]}) );

	}
	componentDidUpdate(prevProps) {
		console.log('---', prevProps);
	}

	handleMapZoomIn = (delta) => {
		const {map} = this.state;
		map.zoomIn(delta);
	};
	handleMapZoomOut = (delta) => {
		const {map} = this.state;
		map.zoomOut(delta);
	};

	handleAddmarker = (e) => {
		const {map, coords} = this.state;
		console.log('---', coords);
		//DG.marker(coords.lat, coords.lng).addTo(map);
	};

	render() {
		return (
			<div className="map">
				<div className="map__container" ref={node => this.map = node} onClick={this.handleAddmarker}>
				</div>
				<ZoomButtons onZoomIn={this.handleMapZoomIn} onZoomOut={this.handleMapZoomOut}/>
			</div>
		);
	}
}


export default Map;
