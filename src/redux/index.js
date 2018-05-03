import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';

const middleware = [logger];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;