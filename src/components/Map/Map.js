import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DG from '2gis-maps';

import {getCategoryMarkers, getMarker} from '../../AC';
import SaveButton from './SaveButton';
import ShowButton from './ShowButton';
import ZoomButtons from './ZoomButtons';
import ErrorMessage from '../layout/ErrorMessage';
import CategoryList from './CategoryList';

import './Map.scss';

class Map extends Component {
	state = {
		map               : null,
		markers           : {},
		markersOfCategory : {},
		categoryIcon      : '',
		customMarker      : {},
		isActiveShowButton: false,
		hasError          : false

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

	componentWillReceiveProps(nextProps) {
		const {categoryMarkers} = this.props;
		if (categoryMarkers.length !== nextProps.categoryMarkers.length) {
			const markers = nextProps.categoryMarkers;
			if (categoryMarkers.length > 0) {
				this.handleRemoveCategoryMarkers();
			}
			this.handleShowCategoryMarkers(markers);
		}
	}


	componentWillUnmount() {
		const {map} = this.state;
		map.remove();
	}


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
		const layers = (markers.getLayers().length > 0) ? markers.getLayers() : [];
		layers.map(layer => markers.removeLayer(layer));
	};
	handleRemoveCategoryMarkers = () => {
		const {markersOfCategory} = this.state;

		if (markersOfCategory !== 0) {
			if (markersOfCategory.getLayers().length > 0) {
				let layers = markersOfCategory.getLayers();

				layers.map(layer => markersOfCategory.removeLayer(layer));
			}
		}


	};
	handleShowCategoryMarkers = (categoryMarkers) => {
		const {map, categoryIcon} = this.state;
		const hospital = DG.icon({
				iconUrl   : '/images/hospital_marker.png',
				iconSize  : [40, 40],
				iconAnchor: [17, 39]
			}),
			car = DG.icon({
				iconUrl   : '/images/gas_station_marker.png',
				iconSize  : [40, 40],
				iconAnchor: [17, 39]
			}),
			graduation = DG.icon({
				iconUrl   : '/images/graduation_marker.png',
				iconSize  : [40, 40],
				iconAnchor: [17, 39]
			}),
			restaurant = DG.icon({
				iconUrl   : '/images/restaurant_marker.png',
				iconSize  : [40, 40],
				iconAnchor: [17, 39]
			}),
			markersOfCategory = DG.layerGroup();

		switch (categoryIcon) {
			case 'hospital' :
				categoryMarkers.map(item => {
					let marker = DG.marker(
						[item.lat, item.lon],
						{icon: hospital}
					);
					return markersOfCategory.addLayer(marker);
				});
				break;
			case 'car' :
				categoryMarkers.map(item => {
					let marker = DG.marker(
						[item.lat, item.lon],
						{icon: car}
					);
					return markersOfCategory.addLayer(marker);
				});
				break;
			case 'graduation' :
				categoryMarkers.map(item => {
					let marker = DG.marker(
						[item.lat, item.lon],
						{icon: graduation}
					);
					return markersOfCategory.addLayer(marker);
				});
				break;
			case 'food' :
				categoryMarkers.map(item => {
					let marker = DG.marker(
						[item.lat, item.lon],
						{icon: restaurant}
					);
					return markersOfCategory.addLayer(marker);
				});
				break;
			default:
				categoryMarkers.map(item => {
					let marker = DG.marker(
						[item.lat, item.lon]
					);
					return markersOfCategory.addLayer(marker);
				});
		}

		this.setState({markersOfCategory});
		map.setZoom(15);
		setTimeout(function() {
			markersOfCategory.addTo(map);
		}, 300);
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
	handleSetCategoryIcon = (category) => {
		this.setState({categoryIcon: category});
	};

	render() {
		const {isActiveShowButton, hasError} = this.state;
		return (
			<div className="map-wrap">
				<CategoryList onShowCategoryMarkers={this.handleShowCategoryMarkers}
				              onSetCategoryIcon={this.handleSetCategoryIcon} />
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
					{hasError && <ErrorMessage text="You need to SignIn for saving markers" />}
				</div>
			</div>
		);
	}
}

Map.propTypes = {
	getMarker      : PropTypes.func.isRequired,
	coordinates    : PropTypes.array.isRequired,
	categoryMarkers: PropTypes.array,
	isLoading      : PropTypes.bool.isRequired
};

Map.defaultProps = {
	coordinates: []
};


export default connect(
	({user, categoryMarkers}) => ({
		coordinates    : user.coordinates,
		isLoading      : categoryMarkers.isLoading,
		categoryMarkers: categoryMarkers.categoryMarkers
	}),
	{getMarker, getCategoryMarkers}
)(Map);
