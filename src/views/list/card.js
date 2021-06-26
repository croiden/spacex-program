// @flow
import * as React from 'react'
import styled from 'styled-components'
import { type Program, type ThemeType } from '../../types'
import { loadImage, getLazyObserver } from '../../utils/'

const Container: ThemeType = styled.div`
    padding: 20px;
    border-radius: 10px;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    margin: 10px;
    max-width: 296px;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    @media screen and (min-width: 1440px) {
        margin: 10px 6px;
        padding: 16px;
        max-width: 288px;
    }
`

const Info = styled.div`
    padding-top: 10px;
    li,
    span {
        color: #3f408b;
    }
`

const Title = styled.h3`
    color: rgb(63, 64, 139);
    margin: 10px 0;
`

const ImageWrapper = styled.div`
    width: 256px;
    height: 256px;
    background: #f2f2f2;
    img {
        width: 256px;
        height: 256px;
    }
`

const Card = React.forwardRef<Program, HTMLDivElement>(
    (
        {
            flight_number,
            mission_name,
            mission_id,
            launch_year,
            launch_success,
            land_success,
            links,
        }: Program,
        ref
    ) => {
        const imgRef = React.useRef()

        React.useEffect(() => {
            let lazyObserver
            let el

            if (imgRef.current) {
                el = imgRef.current
                lazyObserver = getLazyObserver()
                if (lazyObserver) {
                    lazyObserver.observe(el)
                } else {
                    loadImage(el)
                }
            }
            return () => {
                el && lazyObserver && lazyObserver.unobserve(el)
            }
        }, [])

        return (
            /*$FlowFixMe */
            <Container ref={ref}>
                <ImageWrapper>
                    <img ref={imgRef} data-src={links.mission_patch_small} alt={mission_name} />
                </ImageWrapper>
                <Title>
                    {mission_name} #{flight_number}
                </Title>
                <Info>
                    <strong>{'Mission Ids: '}</strong>
                    {mission_id.length ? (
                        <ul>
                            {mission_id.map((mId, index) => (
                                <li key={index}>{mId}</li>
                            ))}
                        </ul>
                    ) : (
                        <span>{'None'}</span>
                    )}
                </Info>
                <Info>
                    <strong>{'Launch Year: '}</strong>
                    <span>{launch_year}</span>
                </Info>
                <Info>
                    <strong>{'Successful Launch: '}</strong>
                    <span>{launch_success ? 'True' : 'False'}</span>
                </Info>
                <Info>
                    <strong>{'Successful Landing: '}</strong>
                    <span>{land_success ? 'True' : 'False'}</span>
                </Info>
            </Container>
        )
    }
)

export default Card
