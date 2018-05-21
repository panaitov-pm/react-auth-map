import React, {Component} from 'react';
import {generate as id} from 'shortid';
import PropTypes from 'prop-types';
import {List} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getCategoryMarkers } from '../../AC';


const defaultCategories = [
	{
		name: 'Больницы',
		icon: 'hospital'

	},
	{
		name: 'Заправки',
		icon: 'car'

	},
	{
		name: 'Школы',
		icon: 'graduation',
	},
	{
		name: 'Рестораны',
		icon: 'food'
	}
	];

class CategoryList extends Component {

	handleGetCategory = (name, icon) => {
		const {getCategoryMarkers, onSetCategoryIcon} = this.props;
			getCategoryMarkers(name);
		onSetCategoryIcon(icon);

	};
	render() {
		return (
			<div className='categories'>
					<List celled className="categories__list">
					{
						defaultCategories.map(category => (
							<List.Item key={id()}>
								<button className="categories__button" title={category.name} onClick={()=> this.handleGetCategory(category.name, category.icon)}>
									<List.Icon name={category.icon} />
									{category.name}
								</button>
							</List.Item>
						))
					}
					</List>
			</div>
		);
	}
}

CategoryList.propTypes = {
  getCategoryMarkers: PropTypes.func.isRequired,
  onSetCategoryIcon: PropTypes.func.isRequired
};

export default connect(
	null,
	{getCategoryMarkers}
)(CategoryList);
