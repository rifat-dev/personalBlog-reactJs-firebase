import * as Types from './Types'
import db from '../../firebase/firebase-confige'

export const createPost = (post) => dispatch =>{
      dispatch({
          type:Types.CREATE_POST,
          palyload:{
             post:post
          }
      })
}