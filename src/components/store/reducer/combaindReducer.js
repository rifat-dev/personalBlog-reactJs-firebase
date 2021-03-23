import { combineReducers } from 'redux'
import authenticationReducer from './authenticationReducer'
import postReducer from './postReducer'



const rootReducer = combineReducers({
    user : authenticationReducer,
    post : postReducer
})

export default rootReducer