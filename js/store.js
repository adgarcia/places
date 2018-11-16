// @flow

import { createStore, compose, applyMiddleware} from 'redux'
import { persistStore, persistReducer, persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {autoComplete} from './reducer_index'
import createSagaMiddleware from 'redux-saga'
import {sagas} from './autocomplete_saga'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

//LOGGER
import {createLogger} from 'redux-logger';
const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

//Apply the ENHANCER
const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware, logger),
);

//PERSIST
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistCombineReducers(persistConfig, {autoComplete})
//

export default (callBack) => {
  let store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store, null, () => {
    if (callBack) callBack(store);
    // console.log('got that store: ', store.getState());
  })
  sagaMiddleware.run(sagas)
  return { store, persistor }
}
