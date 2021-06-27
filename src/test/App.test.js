import React from 'react'
import { render, cleanup } from '@testing-library/react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../App'
import NewsReducer from '../store/reducers'

afterEach(cleanup)

describe('Testing App Component', () => {
    it('should render the App component with provider', () => {
        const store = createStore(NewsReducer, {
            programs: [],
            loading: false,
            error: false,
        })
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(container).toBeDefined()
    })

    it('should render without crashing', () => {
        const store = createStore(NewsReducer, {
            programs: [],
            loading: false,
            error: false,
        })
        const div = document.createElement('div')
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            div
        )
    })
})
