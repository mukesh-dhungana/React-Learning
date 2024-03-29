import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'

const customMiddleWare = (store) => (next) => (action) => typeof action === "function" ? action(store.dispatch) : next(action)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancer(applyMiddleware(customMiddleWare)))
