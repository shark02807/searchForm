import React from 'react';
import './textField.scss';

const TextField = ({ label }) => <div className="ge-text-field">
  <label htmlFor="textField" className="ge-text-field__label">{label}</label>
  <input id="textField" type="text" className="ge-text-field__input"/>
</div>;

export default TextField;