// @flow
import axios from 'axios'

import type { Dispatch, GetState } from '../../types'
import { FETCH_PROGRAMS, FETCH_PROGRAMS_SUCCESS, FETCH_PROGRAMS_FAILURE } from '../actionTypes/'

export const filterPrograms = (searchParams: string) => {
    return (dispatch: Dispatch, getState: GetState) => {
        const params = `${searchParams.substring(1)}&limit=100`
        dispatch({
            type: FETCH_PROGRAMS,
        })
        axios
            .get(`https://api.spacexdata.com/v3/launches?${new URLSearchParams(params).toString()}`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_PROGRAMS_SUCCESS,
                    payload: data,
                })
            })
            .catch(e => {
                console.error(e.message)
                dispatch({
                    type: FETCH_PROGRAMS_FAILURE,
                })
            })
    }
}
