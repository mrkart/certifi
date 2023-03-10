import { types } from "../constants/types";

const initialState = {
    sampleApi : [],
    logInResponse : [],
    userProfile : [],
    addStudent : [],
    userlist : [],
    edituser : [],
    userbyid : [],
    generatedCertificate : [],
    logInResponseFailed : '',
    addNewStudentFailed : '',
    userProfileFailed : '',
    isInfoModal : false,
    walletAddress : null,
    mintResponse : [],
    mintFailed : '',
    userCertificateList : [],
    recentcertificate : [],
    getCertificateFailed:'',
    getCertificate: {},
    flowOwnership : {},
    flowOwnershipFailed : '',
    removedKey : [],
    removeKeyFailed : ''
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
        case types.POST_CREATESTUDENT_FAILURE:
            return {
                ...state,
                addNewStudentFailed : action.payload
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
        case types.GENERATE_CERTIFICATE_SUCCESS:
            return {
                ...state,
                generatedCertificate : action.payload
            }
        case types.GET_USERCERTLIST_SUCCESS:
            return {
                ...state,
                userCertificateList : action.payload
            }
        case types.POST_LOGIN_FAILURE:
            return {
                ...state,
                logInResponseFailed : action.payload
            }
        case types.GET_USERPROFILE_FAILURE:
            return {
                ...state,
                userProfileFailed : action.payload
            }
        case types.SHOW_MODAL:
            return {
                ...state,
                isInfoModal : action.payload
            }
        case types.CLOSE_MODAL:
            return {
                ...state,
                isInfoModal : action.payload
            }
        case types.GET_WALLET_ADDRESS:
            return {
                ...state,
                walletAddress : action.payload
            }
        case types.MINT_CERTIFICATE:
            return {
                ...state,
                mintResponse : action.payload
            }
        case types.MINT_CERTIFICATE_FAILURE:
            return {
                ...state,
                mintFailed : action.payload
            }
        case types.POST_RECENTCERTIFICATE_SUCCESS:
            return {
                ...state,
                recentcertificate : action.payload
            }
        case types.GET_CERTIFICATE_CERT_NO_SUCCESS:
            return {
                ...state,
                getCertificate: action.payload
            }
        case types.GET_CERTIFICATE_CERT_NO_FAILURE:
            return {
                ...state,
                getCertificateFailed: action.payload
            }
        case types.ADD_OWNERSHIP_FLOW_ACCOUNT:
            return {
                ...state,
                flowOwnership: action.payload
            }
        case types.ADD_OWNERSHIP_FLOW_ACCOUNT_FAILURE:
            return {
                ...state,
                flowOwnershipFailed: action.payload
            }
        case types.REMOVE_PUBLIC_KEY:
            return {
                ...state,
                removedKey: action.payload
            }
        case types.REMOVE_PUBLIC_KEY_FAILURE:
            return {
                ...state,
                removeKeyFailed: action.payload
            }
        default:
            return state
    }
}