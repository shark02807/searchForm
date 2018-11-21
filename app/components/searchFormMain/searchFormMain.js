import React from 'react';
import { connect } from 'react-redux';
import { toggleAdditional } from 'State/searchForm/searchFormActions';
import TextField from 'Components/textField/textField'
import Button from 'Components/button/button'
import './searchFormMain.scss';

const SearchFormMain = ({ onSearchFormToggle }) => <div className="ge-search-form__main">
  <TextField label={'Search Phrase'}/>
  <Button onClick={onSearchFormToggle}/>
</div>;

export default connect(null, { onSearchFormToggle: toggleAdditional })(SearchFormMain);