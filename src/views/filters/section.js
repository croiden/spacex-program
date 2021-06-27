// @flow
import * as React from 'react'
import styled from 'styled-components'
import { type ThemeType } from '../../types/'

const Container: ThemeType = styled.div`
    padding: 10px 0px;
`
const Title = styled.div`
    text-align: center;
    padding: 4px;
    border-bottom: 1px solid #cacaca;
    margin: 0px 20px;
`
const Options = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
const Option = styled.button`
    background: ${props => (props.active ? '#66bd00' : '#bde292')};
    padding: 4px 10px;
    border-radius: 4px;
    min-width: 60px;
    text-align: center;
    margin: 10px 30px;
    border: 0;
    cursor: pointer;

    @media screen and (min-width: 700px) {
        margin: 10px;
    }
`

type Props = {
    id: string,
    title: string,
    options: Array<string>,
}
export default function Section({ id, title, options }: Props) {
    const [selectedOption, setSelectedOption] = React.useState('')

    React.useEffect(() => {
        const currentHash = document.location.hash.substring(1)
        const urlSearchParams = new URLSearchParams(currentHash)
        if (urlSearchParams.has(id)) {
            setSelectedOption(urlSearchParams.get(id))
        }
    }, [id])

    const handleClick = (option: string) => {
        selectedOption === option ? setSelectedOption('') : setSelectedOption(option)

        const currentHash = document.location.hash.substring(1)
        const urlSearchParams = new URLSearchParams(currentHash)
        urlSearchParams.delete(id)
        if (selectedOption !== option) {
            urlSearchParams.append(id, option)
        }
        document.location.hash = `?${urlSearchParams.toString()}`
    }
    return (
        <Container>
            <Title>{title}</Title>
            <Options>
                {options.map((option, index) => (
                    <Option
                        key={index}
                        onClick={() => {
                            handleClick(option)
                        }}
                        active={option === selectedOption}
                    >
                        {option}
                    </Option>
                ))}
            </Options>
        </Container>
    )
}
