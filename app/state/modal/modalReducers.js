import { handleActions } from 'redux-actions';
import modalActionTypes from './modalActionTypes';
const {
  SHOW_SUCCESS,
  HIDE_SUCCESS,
  SHOW_ERROR,
  HIDE_ERROR
} = modalActionTypes;
const INITIAL_STATE = {
  modalType: null,
  modalProps: {},
  isError: null,
  error: {
    errorText: null,
    errorAdditionalText: null
  }
};
export default handleActions(
  {
    [SHOW_SUCCESS]: (state, action) => ({
    ...state,
    modalType: action.modalType || null,
  modalProps: action.modalProps || {}
}),
[HIDE_SUCCESS]: () => INITIAL_STATE,
  [SHOW_ERROR]: (state, action) => ({
  ...state,
  isError: true,
  error: { ...state.error, ...action.error }
}),
[HIDE_ERROR]: state => ({
  ...state,
  isError: null,
  error: state.error
})
},
INITIAL_STATE
);