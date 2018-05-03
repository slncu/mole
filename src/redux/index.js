import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';

const middleware = [logger];

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;
