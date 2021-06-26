// @flow
import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { type Program, type ThemeType } from '../../types'
import Card from './card'

const Container: ThemeType = styled.div`
    @media screen and (min-width: 700px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        height: calc(100vh - 140px);
        overflow: auto;
        flex: 1;
    }
`
const EmptyMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #484747;
    font-style: italic;
    font-size: 20px;
    margin: 20px;
`

export default function List() {
    const programs: Array<Program> = useSelector(state => state.programs)
    const loading: boolean = useSelector(state => state.loading)
    const error: boolean = useSelector(state => state.error)

    return (
        <Container>
            {error ? (
                <EmptyMessage>{'Error occurred...'}</EmptyMessage>
            ) : loading ? (
                <EmptyMessage>{'Loading...'}</EmptyMessage>
            ) : programs.length ? (
                programs.map(
                    ({
                        flight_number,
                        mission_name,
                        mission_id,
                        launch_year,
                        launch_success,
                        land_success,
                        links,
                    }) => (
                        <Card
                            key={flight_number}
                            flight_number={flight_number}
                            mission_name={mission_name}
                            mission_id={mission_id}
                            launch_year={launch_year}
                            launch_success={launch_success}
                            land_success={land_success}
                            links={links}
                        />
                    )
                )
            ) : (
                <EmptyMessage>{'No programs found'}</EmptyMessage>
            )}
        </Container>
    )
}
