import {ADD_TEACHER_REQUEST,ADD_TEACHER_SUCCESS,ADD_TEACHER_FAILURE } from './action'

const initState = {  
    isLoading:false,
    message:""
}


const addTeacherReducer = ( state = initState , { type , payload }) =>{
    //console.log(payload)
    switch( type ){
        case ADD_TEACHER_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
         case ADD_TEACHER_SUCCESS :          
             return {
                 ...state,
                isLoading : false,
                message:payload.message
                 } 
          case ADD_TEACHER_FAILURE :
              return {
                 ...state,
                 isError:true,
                 isLoading : false,
                
              } 
            default :
            return {...state }  

    }
}

export default addTeacherReducer