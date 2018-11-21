import { string } from 'prop-types';
import React from 'react';
import './button.scss';

const Button = (className) => <div className={`ge-button ${className}`}>Filters</div>;

Button.propTypes = {
  className: string
};

Button.defaultProps = {
  className: ''
};

export default Button;