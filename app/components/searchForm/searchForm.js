import React from 'react';
import { connect } from 'react-redux';
import SearchFormMain from 'Components/searchFormMain/searchFormMain';
import SearchFormAdditional from 'Components/searchFormAdditional/searchFormAdditional';

const SearchForm = ({ isAdditionalOpen }) => <div className="ge-search-form">
  <SearchFormMain />
  {
    isAdditionalOpen && <SearchFormAdditional />
  }
</div>;

export default connect(({ searchForm: { isAdditionalOpen } }) => ({
  isAdditionalOpen
}))(SearchForm);