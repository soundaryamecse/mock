import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE } from './action'

const initState = {
    isError:false,
    isLoading:false,
    isAuth : false,
    message:"",
    userDetails :""
}


const authReducer = ( state = initState , { type , payload }) =>{
    //console.log(payload)
    switch( type ){
        case LOGIN_REQUEST :
            return {
                ...state,
                isLoading : true,
                isError:false,
            }
         case LOGIN_SUCCESS :          
             return {
                 ...state,
                isLoading : false,
                isError : false,
                isAuth:true,
                message:payload.message,
                userDetails:payload.userDetails
             } 
          case LOGIN_FAILURE :
              return {
                 ...state,
                 isError:true,
                 isLoading : false,
                 isGetDataError :true
              } 
            default :
            return {...state }  

    }
}

export default authReducer