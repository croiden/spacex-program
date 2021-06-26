// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// $FlowFixMe
import thunkMiddleware from 'redux-thunk'
import NewsReducer from './store/reducers'

window.onload = () => {
    // Grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__

    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__

    // Create Redux store with initial state
    const store = createStore(NewsReducer, preloadedState, applyMiddleware(thunkMiddleware))

    const root = document.getElementById('root')
    root &&
        ReactDOM.hydrate(
            <Provider store={store}>
                <App />
            </Provider>,
            root
        )
}
