import {DELETE_TEACHER_REQUEST,DELETE_TEACHER_SUCCESS,DELETE_TEACHER_FAILURE } from './action'

const initState = {  
    isLoading:false,
    DeleteMessage:""
}


const deleteTeacherReducer = ( state = initState , { type , payload }) =>{
    console.log(payload)
    switch( type ){
        case DELETE_TEACHER_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
         case DELETE_TEACHER_SUCCESS :          
             return {
                 ...state,
                isLoading : false,
                DeleteMessage:payload.message
                 } 
          case DELETE_TEACHER_FAILURE :
              return {
                 ...state,
                 isError:true,
                 isLoading : false,
                
              } 
            default :
            return {...state }  

    }
}

export default deleteTeacherReducer