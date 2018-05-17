import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DG from '2gis-maps';

import './MainMap.scss';

class Map extends Component {
	componentDidMount() {
		const map = DG.map(this.map, {
			'center': [54.98, 82.89],
			'zoom': 13
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
	}
	render() {
		return (
			<div className="map" ref={node => this.map = node}>

			</div>
		);
	}
}

Map.propTypes = {
};

export default Map;
