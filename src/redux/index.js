import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducer'

const middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
)

export const persistor = persistStore(store)

export default store
