import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { apiMiddleware } from './middleware/api';
import { actionArrayMiddleware } from './middleware/actionArray';

const initialState = {};

const middleware = [thunk, apiMiddleware, actionArrayMiddleware];

const store = createStore(
  rootReducer, 
  initialState, 
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;