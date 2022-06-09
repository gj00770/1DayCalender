import { compose, createStore, applyMiddleware } from "redux";
import  yearReducer from '../reducer/reducer'
import reducers from '../reducer/reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;