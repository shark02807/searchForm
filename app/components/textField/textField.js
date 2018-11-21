import React from 'react';
import './textField.scss';

const TextField = () => <div className="ge-text-field">
  <label htmlFor="textField" className="ge-text-field__label">Search Phrase</label>
  <input id="textField" type="text" className="ge-text-field__input"/>
</div>;

export default TextField;