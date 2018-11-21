import { fork } from 'redux-saga/effects';
import { initSaga as searchFormInitSaga } from 'State/searchForm/searchFormSaga.js';

export default function* rootSaga() {
  yield [
    fork(searchFormInitSaga)
  ];
}
