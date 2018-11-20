import { createStore, applyMiddleware, compose } from 'redux';
import reduxSaga from 'redux-saga';
import constants from 'Utilities/constants';
import { checkPlatform } from 'Utilities/utils';
import fetchMiddleware from './fetchMiddleware';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

function configureStore(initialState) {
  const sagaMiddleware = reduxSaga();
  const initedComposeParams = [
    applyMiddleware(fetchMiddleware),
    applyMiddleware(sagaMiddleware)
  ];
  if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'aem') && window.__REDUX_DEVTOOLS_EXTENSION__) {
    initedComposeParams.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose.apply(this, initedComposeParams)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureStore({
  referrer: document.referrer,
  constants: constants.getAll(),
  currentDate: new Date(),
  currentDevice: checkPlatform()
});

export default store;
