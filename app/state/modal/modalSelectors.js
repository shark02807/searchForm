import { getConstant } from 'State/constants/constantsSelectors';
import { createSelector } from 'reselect';
import get from 'lodash/get';

const isLoggedIn = state => !!state.account.data.firstName;

const accountSelectors = {
    isFetched: state => state.account.isFetched,
  isPending: state => state.account.isPending,
  displayName: state => `${state.account.data.firstName} ${state.account.data.lastName}`,
  isLoggedIn,
  loginUrlInfo: createSelector(
  state => getConstant('myaccount', state).loginUrl,
  state => getConstant('myaccount', state).logoutUrl,
  state => getConstant('myaccount', state).registrationUrl,
  state => getConstant('myaccount', state).invitationUrl,
  state => getConstant('myaccount', state).resourcePath,
  state => getConstant('myaccount', state).updateProfileUrl,
  () => `${window.location.origin}${window.location.pathname}`,
  state => getConstant('myaccount', state).changePasswordUrl,
  (loginUrl, logoutUrl, registrationUrl, invitationUrl, resourcePath, updateProfileUrl, redirectUrl, changePasswordUrl) => ({
  loginUrl,
  logoutUrl,
  registrationUrl,
  invitationUrl,
  resourcePath,
  updateProfileUrl,
  redirectUrl,
  changePasswordUrl
})
),
roleCode: state => (isLoggedIn(state)
  ? get(state, 'account.data.dentsplyCustomerAccountRole.code') || 'CONTACT'
  : 'ANONYMOUS')
};

export default accountSelectors;
