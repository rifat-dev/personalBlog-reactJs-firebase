import * as Types from '../actions/Types'

const postReducer = (state = [], action) => {
    switch (action.type) {
        case Types.CREATE_POST: {
            const posts = [...state,action.palyload.post];
            return posts;
        }
        case Types.GET_POST: {
            return action.palyload.posts;
        }
        case Types.UPDATE_POST: {
           const posts = [...state];
           posts.map(post => {
               if(post.id === action.payload.post.id){
                   return action.payload.post;
               }
               
               return post;
           })
           return posts
        }
        case Types.LIKE_DISLIKE: {
           const posts = [...state];
           posts.map(post => {
               if(post.id === action.palyload.post.id){
                   return action.palyload.post;
               }
               
               return post;
           })
           return posts
        }
        default: return state;
    }
}

export default postReducer;