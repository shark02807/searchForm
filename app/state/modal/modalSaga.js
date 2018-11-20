import { take, call, fork, select, put } from 'redux-saga/effects';
import { lockBodyToggle } from './modalHelpers';
import { showSuccess, hideSuccess } from './modalActions';
import modalActionTypes from './modalActionTypes';
const { SHOW, HIDE } = modalActionTypes;
export function* hideCurrent(nextType) {
  const { modal: { modalType } } = yield select();
  yield put(hideSuccess(modalType, nextType));
}
export function* show() {
  try {
    while (true) {
      const action = yield take(SHOW);
      yield call(hideCurrent, action.modalType);
      yield put(showSuccess(action));
      yield call(lockBodyToggle, true);
    }
  } catch (e) {
    console.error(e.toString());
  }
}
export function* hide() {
  try {
    while (true) {
      yield take(HIDE);
      yield call(hideCurrent);
      yield call(lockBodyToggle, false);
    }
  } catch (e) {
    console.error(e.toString());
  }
}
export function* initSaga() {
  yield [
    fork(show),
    fork(hide)
  ];
}