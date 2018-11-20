import { fork } from 'redux-saga/effects';
import { initSaga as invitationInitSaga } from 'State/invitation/invitationSaga';
import { initSaga as utilsInitSaga } from 'State/utils/utilsSaga';
import { initSaga as simpleApiInitSaga } from 'State/simple/simpleApiSaga';
import { initSaga as modalInitSaga } from 'State/modal/modalSaga';

export default function* rootSaga() {
  yield [
    fork(invitationInitSaga),
    fork(utilsInitSaga),
    fork(simpleApiInitSaga),
    fork(modalInitSaga)
  ];
}
