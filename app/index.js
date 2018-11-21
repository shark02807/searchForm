import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'State/store';
import SearchForm from 'Components/searchForm/searchForm';

ReactDOM.render(
  <Provider store={store}>
    <SearchForm />
  </Provider>,
  document.getElementById('root')
);
