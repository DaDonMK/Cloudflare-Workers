import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import dataReducer from './dataReducer'

const rootReducer = combineReducers({
    dataArr: dataReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))