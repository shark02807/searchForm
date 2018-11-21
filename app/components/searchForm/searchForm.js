import React from 'react';
import TextField from 'Components/textField/textField'
import Button from 'Components/button/button'
import SearchFormAdditional from 'Components/searchFormAdditional/searchFormAdditional'
import './searchForm.scss';

const SearchForm = () => <div className="ge-search-form">
  <div className="ge-search-form__main">
    <TextField />
    <Button />
  </div>
  <SearchFormAdditional />
</div>;

export default SearchForm;