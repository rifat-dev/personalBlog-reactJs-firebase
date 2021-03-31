import * as Types from '../actions/Types';

const initialState = {
    user: {},
    isAdmin: false,
    isLoggedIn: false
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.USER_CREATE: {

            return {
                isLoggedIn : action.palyload.user ? true : false,
                user : action.palyload.user
            }
        }
        case Types.USER_LOGIN:{
            return {
                isLoggedIn : action.palyload.user ? true : false,
                isAdmin : action.palyload.user.roal === "admin" ? true : false,
                user : action.palyload.user
            }
        }
        case Types.USER_LOGOUT:{
            return {
                isLoggedIn : false,
                isAdmin:false,
                user:{}
            }
        }
        default: return state
    }
}

export default authenticationReducer;