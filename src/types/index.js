// @flow
import { type ComponentType } from 'react'

export type ThemeType = ComponentType<{}>

export type Program = {
    flight_number: number,
    mission_name: string,
    mission_id: Array<number>,
    launch_year: string,
    launch_success: boolean,
    land_success?: boolean,
    links: {
        mission_patch_small: string,
    },
}
export type StoreType = {
    programs: Array<Program>,
    loading: boolean,
    error: boolean,
}

export type GetState = () => StoreType
type Action = {
    type: string,
    payload?: any,
}
export type Dispatch = (action: Action) => any
