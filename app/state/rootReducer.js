import { combineReducers } from 'redux';
import i18n from 'State/i18n/i18nReducers';
import account from 'State/account/accountReducers';
import productCards from 'State/productCard/productCardReducers';
import modal from 'State/modal/modalReducers';

export default combineReducers({
  referrer: (state = {}) => state,
  constants: (state = {}) => state,
  currentDate: (state = {}) => state,
  currentDevice: (state = {}) => state,
  i18n,
  account,
  productCards,
  modal
});
