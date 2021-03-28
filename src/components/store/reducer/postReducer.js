import * as Types from '../actions/Types'

const postReducer = (state = [], action) => {
      switch(action.type){
          case Types.CREATE_POST:{
              console.log(action.palyload.post)
              return state = [...state, action.palyload.post];
          }
          case Types.GET_POST:{
             return state = [...action.palyload.posts];
          }
          default: return state;
      }
}

export default postReducer;