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

const PAGE_SIZE = 20

export default function List() {
    const programs: Array<Program> = useSelector(state => state.programs)
    const loading: boolean = useSelector(state => state.loading)
    const error: boolean = useSelector(state => state.error)

    const [showCount, setShowCount] = React.useState(PAGE_SIZE)

    const observer = React.useRef()
    const lastElementRef = React.useCallback(
        node => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && programs.length > showCount) {
                    setShowCount(count => count + PAGE_SIZE)
                }
            })
            if (node) observer.current.observe(node)
        },
        [programs.length, showCount]
    )

    const displayPrograms = programs.slice(0, showCount)

    return (
        <Container>
            {error ? (
                <EmptyMessage>{'Error occurred...'}</EmptyMessage>
            ) : loading ? (
                <EmptyMessage>{'Loading...'}</EmptyMessage>
            ) : displayPrograms.length ? (
                displayPrograms.map(
                    (
                        {
                            flight_number,
                            mission_name,
                            mission_id,
                            launch_year,
                            launch_success,
                            land_success,
                            links,
                        },
                        index
                    ) => {
                        let refProp = {}
                        if (displayPrograms.length === index + 1) {
                            refProp = { ref: lastElementRef }
                        }
                        return (
                            <Card
                                {...refProp}
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
                    }
                )
            ) : (
                <EmptyMessage>{'No programs found'}</EmptyMessage>
            )}
        </Container>
    )
}
