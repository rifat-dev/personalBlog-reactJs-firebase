import * as Types from './Types'
import db from '../../firebase/firebase-confige'

export const getAllPost =  () => async (dispatch) => {
    const posts = [];
    const snapshot = await db.collection('posts').get()
    snapshot.forEach(doc => {
        const post = {
            id:doc.id,
            ...doc.data()
        }
        // console.dir(doc.id)
        posts.push(post)
    });
    dispatch({
        type:Types.GET_POST,
        palyload:{
            posts:posts
        }
    })
}

export const createPost = (post) => dispatch => {
    dispatch({
        type: Types.CREATE_POST,
        palyload: {
            post: post
        }
    })
}

