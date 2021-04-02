import * as Types from '../actions/Types'


const commentReducer = (state = [], action) => {
    switch (action.type) {
        case Types.GET_COMMENTS: {
            return action.payload.comments;
        }
        case Types.CREATE_COMMENT: {
            const comments = [...state, action.payload.comment];
            return comments;
        }
        default: return state;
    }
}


export default commentReducer
