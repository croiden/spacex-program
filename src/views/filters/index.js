// @flow
import React from 'react'
import styled from 'styled-components'

import { type ThemeType } from '../../types/'
import Section from './section'
import FiltersData from '../../data/filters.json'

const Container: ThemeType = styled.div`
    padding: 10px;
    background: white;
    border-radius: 10px;
    max-width: 296px;
    min-width: 296px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    margin: 10px;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    h2 {
        margin: 0px;
    }
    @media screen and (min-width: 700px) {
        height: calc(100vh - 160px);
    }
    @media screen and (min-width: 1024px) {
        max-width: 200px;
        min-width: 200px;
    }
`
export default function Filters() {
    return (
        <Container>
            <h2>{'Filters'}</h2>
            {FiltersData.map(({ id, title, options }) => (
                <Section key={id} id={id} title={title} options={options} />
            ))}
        </Container>
    )
}
