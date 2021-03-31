import * as Types from './Types'
import db from '../../firebase/firebase-confige'

export const createUser = ({ firstName, lastName, roal, email, uid, history }) => dispatch => {
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        roal: roal,
        uid: uid,
    }

    db.collection("users").doc(uid).set(user)
        .then(() => {
            console.log("Document successfully written!");
            dispatch({
                type: Types.USER_CREATE,
                palyload: {
                    user: user
                }
            })
            history.push('/home')
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });


}

export const findUser = ({ uid, history }) => dispatch => {


    var docRef = db.collection("users").doc(uid);
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            dispatch({
                type: Types.USER_LOGIN,
                palyload: {
                    user: doc.data()
                }
            })
            history.push("/home");
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

export const LogOut = () => dispatch =>{
    console.log("LogOut Success")
    dispatch({
        type:Types.USER_LOGOUT,
        palyload:{}
    })
}