import { compose, createStore, applyMiddleware } from "redux";
import  yearReducer from '../reducer/reducer'

const store = createStore(yearReducer)

export default store;