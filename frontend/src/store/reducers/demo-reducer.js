import { types } from "../constants/types";

const initialState = {
    sampleApi : [],
    logInResponse : [],
    userProfile : []
}
//receives the current state and an action object
export function demoReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_SAMPLEAPI_SUCCESS:
            return {
                ...state,
                sampleApi : action.payload
            }
        case types.POST_LOGIN_SUCCESS:
            return {
                ...state,
                logInResponse : action.payload
            }
        case types.GET_USERPROFILE_SUCCESS:
            return {
                ...state,
                userProfile : action.payload
            }
        default:
            return state
    }
}