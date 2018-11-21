import { string, func } from 'prop-types';
import React from 'react';
import './button.scss';

const Button = ({ className, onClick }) => (
  <button type="button" className={`ge-button ${className}`} onClick={onClick}>
    Filters
  </button>
);

Button.propTypes = {
  className: string,
  onClick: func.isRequired
};

Button.defaultProps = {
  className: ''
};

export default Button;