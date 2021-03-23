import * as Types from '../actions/Types'

const postReducer = (state = [], action) => {
      switch(action.type){
          case Types.CREATE_POST:{

          }
          default: return state;
      }
}

export default postReducer;