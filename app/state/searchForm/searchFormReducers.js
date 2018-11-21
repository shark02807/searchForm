import { handleActions } from 'redux-actions';
import searchFormActionTypes from './searchFormActionTypes';

const {
  TOGGLE_ADDITIONAL,
  FETCH_FIELDS,
  FETCH_FIELDS_SUCCESS,
  FETCH_FIELDS_FAILURE
} = searchFormActionTypes;

const INITIAL_STATE = {
  isAdditionalOpen: false,
  categories: [],
  price: null,
  fields: {},
  isFieldsPending: false
};

export default handleActions(
  {
    [TOGGLE_ADDITIONAL]: state => ({
      ...state,
      isAdditionalOpen: !state.isAdditionalOpen
    }),
    [FETCH_FIELDS]: state => ({
      ...state,
      isFieldsPending: true
    }),
    [FETCH_FIELDS_SUCCESS]: (state, action) => ({
      ...state,
      isFieldsPending: false,
      fields: action.payload
    }),
    [FETCH_FIELDS_FAILURE]: state => ({
      ...state,
      isFieldsPending: false
    })
  },
  INITIAL_STATE
);
