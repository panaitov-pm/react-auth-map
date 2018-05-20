import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({text}) => {
	return (
		<div style={{color: 'red', marginTop: '1rem'}}>{text}</div>
	)
};

ErrorMessage.propTypes = {
	text: PropTypes.string.isRequired
};

ErrorMessage.defaultProps = {
    text: '',
};


export default ErrorMessage;