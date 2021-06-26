// @flow
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useDispatch } from 'react-redux'

import Filters from './views/filters/'
import List from './views/list'
import { filterPrograms } from './store/actions/'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f2f2f2;
        margin: 20px;
        overflow: hidden;
    }
    * {
        box-sizing: border-box;
    }

    @media screen and (min-width: 1440px) {
        body{
            max-width: 1440px;
            margin: auto;
        }
    }
`

const Container = styled.div`
    height: calc(100vh - 140px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 700px) {
        flex-direction: row;
        align-items: flex-start;
        overflow: hidden;
    }
`

export default function App() {
    const dispatch = useDispatch()

    const handleHashChange = React.useCallback(() => {
        window.location.hash.length && dispatch(filterPrograms(window.location.hash))
    }, [dispatch])

    React.useEffect(() => {
        handleHashChange()
        window.addEventListener('hashchange', handleHashChange)
        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [handleHashChange])

    return (
        <>
            <GlobalStyle />
            <h1>SpaceX Launch Programs</h1>
            <Container>
                <Filters />
                <List />
            </Container>
        </>
    )
}
