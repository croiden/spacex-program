// @flow
import { FETCH_PROGRAMS, FETCH_PROGRAMS_SUCCESS, FETCH_PROGRAMS_FAILURE } from '../actionTypes/'
import { type StoreType } from '../../types'
const initialState: StoreType = {
    programs: [],
    loading: false,
    error: false,
}

export default (state: StoreType = initialState, action: Object): StoreType => {
    switch (action.type) {
        case FETCH_PROGRAMS:
            return {
                programs: [],
                loading: true,
                error: false,
            }
        case FETCH_PROGRAMS_SUCCESS:
            return {
                programs: action.payload,
                loading: false,
                error: false,
            }
        case FETCH_PROGRAMS_FAILURE:
            return {
                programs: [],
                loading: false,
                error: true,
            }
        default:
            return state
    }
}
