import {GET_TEACHER_REQUEST,GET_TEACHER_SUCCESS,GET_TEACHER_FAILURE } from './action'

const initState = {  
    isLoading:false,
    data:[],
}


const getTeacherReducer = ( state = initState , { type , payload }) =>{
    //console.log(payload)
    switch( type ){
        case GET_TEACHER_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
         case GET_TEACHER_SUCCESS :          
             return {
                 ...state,
                isLoading : false,
                data:payload
                 } 
          case GET_TEACHER_FAILURE :
              return {
                 ...state,
                 isError:true,
                 isLoading : false,
                
              } 
            default :
            return {...state }  

    }
}

export default getTeacherReducer