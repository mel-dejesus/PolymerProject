import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer.js';

export const store = createStore(
  reducer,
  compose(applyMiddleware(thunk))
);






