import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import I18n from 'Views/i18n/i18n';
import store from '../state/store';

export default (Component, componentPlace, props) => {
  ReactDOM.render(
    <Provider store={store}>
      <I18n>
        <Component {...props} />
      </I18n>
    </Provider>,
    componentPlace
  );
};
