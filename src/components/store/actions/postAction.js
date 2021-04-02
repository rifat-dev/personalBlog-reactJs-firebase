import * as Types from './Types'
import db from '../../firebase/firebase-confige'

export const getAllPost = () => async (dispatch) => {
    const posts = [];
    const snapshot = await db.collection('posts').get()
    snapshot.forEach(doc => {
        const post = {
            id: doc.id,
            ...doc.data()
        }
        // console.dir(doc.id)
        posts.push(post)
    });
    dispatch({
        type: Types.GET_POST,
        palyload: {
            posts: posts
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

export let likeDislike = (post) => (dispatch) => {
    db.collection("posts").doc(post.id).update({likes:[...post.likes]})
        .then(() => {
            dispatch({
                type: Types.LIKE_DISLIKE,
                palyload: {
                    post: post
                }
            })
            console.log("Document successfully updated!");
            
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
           
        });
}

export const createComment = (post ,comment , userId) => dispatch =>{

}

