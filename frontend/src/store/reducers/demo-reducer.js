import { types } from "../constants/types";

const initialState = {
    sampleApi : [],
    logInResponse : [],
    userProfile : [],
    addStudent : [],
    userlist : [],
    edituser : [],
    userbyid : []
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
        case types.POST_CREATESTUDENT_SUCCESS:
            return {
                ...state,
                addStudent : action.payload
            }
        case types.GET_USERLIST_SUCCESS:
            return {
                ...state,
                userlist : action.payload
            }
        case types.PUT_EDITUSERDETAILS_SUCCESS:
            return {
                ...state,
                edituser : action.payload
            }
        case types.GET_USERBYID_SUCCESS:
            return {
                ...state,
                userbyid : action.payload
            }
        default:
            return state
    }
}