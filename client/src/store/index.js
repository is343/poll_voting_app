import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers';



const middleware = [
  thunk, ReduxPromise
]

if (process.env.NODE_ENV !== `production`) {
  const logger = createLogger({ collapsed: true });
  middleware.push(logger);
}

// setup for redux devtools extension
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, withDevTools(
  applyMiddleware(...middleware)
))
