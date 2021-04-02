import * as Types from './Types'
import db from '../../firebase/firebase-confige'

export const getAllComments = () => async (dispatch) => {
    const comments = [];
    const snapshot = await db.collection('comments').get()
    snapshot.forEach(doc => {
        const comment = {
            id: doc.id,
            ...doc.data()
        }
        // console.dir(doc.id)
        comments.push(comment)
    });
    dispatch({
        type: Types.GET_COMMENTS,
        payload: {
            comments: comments
        }
    })
}

export const createComment = (post, comment) => dispatch => {

    db.collection("comments").add(comment)
        .then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
                
                comment.id = docRef.id
                dispatch({
                    type: Types.CREATE_COMMENT,
                    payload: {
                        comment: comment
                    }
                })
             
             post.comments.push(docRef.id)
             db.collection("posts").doc(post.id).update({ comments: [...post.comments] })
                .then(() => {
                    dispatch({
                        type: Types.UPDATE_POST,
                        payload: {
                            post: post
                        }
                    })
                    console.log("Document successfully updated!");

                })
                .catch((error) => {
                    console.error("Error updating document: ", error);

                });

        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}
