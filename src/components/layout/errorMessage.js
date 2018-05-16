import React from 'react';
import PropTypes from 'prop-types';

const errorMessage = ({text}) => {
	return (
		<div style={{color: 'red', marginTop: '1rem'}}>{text}</div>
	)
};

errorMessage.propTypes = {
	text: PropTypes.string.isRequired
};

errorMessage.defaultProps = {
    text: '',
};


export default errorMessage;