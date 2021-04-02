import { combineReducers } from 'redux'
import authenticationReducer from './authenticationReducer'
import postReducer from './postReducer'
import commentReducer from './commentsReducer'



const rootReducer = combineReducers({
    user : authenticationReducer,
    posts : postReducer,
    comments:commentReducer
})

export default rootReducer