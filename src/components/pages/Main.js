import React from 'react';
import Map from '../Map/Map';
import CategoryList from '../Map/CategoryList';

const Main = props => {
	return (
		<div className="main">
			<CategoryList />
			<Map/>
		</div>
	);
};

Main.propTypes = {};

export default Main;
