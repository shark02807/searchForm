import { take, call, put, fork } from 'redux-saga/effects';
import searchFormActionTypes from './searchFormActionTypes';
import { fetchFieldsSuccess, fetchFieldsFailure } from './searchFormActions';
import { fetchFields as fetchFieldsApi } from './searchFormApi';

const { FETCH_FIELDS } = searchFormActionTypes;

export function* getFields() {
  try {
    while (true) {
      yield take(FETCH_FIELDS);
      const { response } = yield call(fetchFieldsApi);
      if (response) {
        yield put(fetchFieldsSuccess(response.data));
      } else {
        yield put(fetchFieldsFailure());
      }
    }
  } catch (e) {
    console.error(e.toString());
  }
}

export function* initSaga() {
  yield [
    fork(getFields)
  ];
}
