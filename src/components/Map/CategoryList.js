import React, {Component} from 'react';
import {generate as id} from 'shortid';

import {List} from 'semantic-ui-react';


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

	handleGetCategory = (name) => {

	};
	render() {
		return (
			<div className='categories'>
					<List celled className="categories__list">
					{
						defaultCategories.map(category => (
							<List.Item key={id()}>
								<button className="categories__button" title={category.name} onClick={()=> this.handleGetCategory(category.name)}>
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
};

export default CategoryList;
