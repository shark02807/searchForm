import { createStore, applyMiddleware } from 'redux';
import reduxSaga from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const initialState = {};
const sagaMiddleware = reduxSaga();

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
